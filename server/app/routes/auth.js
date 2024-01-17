const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to user authentication
 * definitions:
 *   schemas:
 *     AuthUser:
 *       description: Authentication User Schema
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         userPassword:
 *           type: string
 *       required: ['userName', 'userPassword']
 */

/**
 * @swagger
 * /auth:
 *    post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate a user
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials for authentication
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/AuthUser'
 *     responses:
 *       200:
 *         description: Successful authentication
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/AuthUser'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        let result;

        // Check if the user is a student
        result = await database.getPromise().query(
            'SELECT idStudent AS id, idStudentGroup AS userGroup, userPassword FROM student WHERE userName LIKE ?;',
            [req.body.userName]
        );

        if (result[0].length === 1) {
            const hashedPassword = result[0][0].userPassword;

            // Compare the hashed password with the input password using bcrypt
            const passwordMatch = await bcrypt.compare(req.body.userPassword, hashedPassword);

            if (passwordMatch) {
                result[0][0].userType = 'student';
                return res.status(200).json({ status: 200, data: result[0] });
            }
        }

        // If the user is not a student, check if they are a teacher
        result = await database.getPromise().query(
            'SELECT idTeacher AS id, userPassword FROM teacher WHERE userName LIKE ?;',
            [req.body.userName]
        );

        if (result[0].length === 1) {
            const hashedPassword = result[0][0].userPassword;

            // Compare the hashed password with the input password using bcrypt
            const passwordMatch = await bcrypt.compare(req.body.userPassword, hashedPassword);

            if (passwordMatch) {
                result[0][0].userType = 'teacher';
                return res.status(200).json({ status: 200, data: result[0] });
            }
        }

        // No matching user found
        return res.status(401).json({ status: 401, error: 'Authentication failed' });
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;