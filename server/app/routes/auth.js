const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

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
        let result = await database.getPromise().query(
            'SELECT * FROM student WHERE userName LIKE ? AND userPassword LIKE ?;',
            [req.body.userName, req.body.userPassword]
        );
        if (result[0].length === 0) {
            result = await database.getPromise().query(
                'SELECT * FROM teacher WHERE userName LIKE ? AND userPassword LIKE ?;',
                [req.body.userName, req.body.userPassword]
            );
        }
        if (result[0].length === 0) {
            res.status(401).send();
            return;
        }
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;