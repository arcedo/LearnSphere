const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API operations related to teachers
 * definitions:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: integer
 *         email:
 *           type: string
 *         userName:
 *           type: string
 *         userPassword:
 *           type: string
 *       required:
 *         - dni
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *         - email
 *         - userName
 *         - userPassword
 */


/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers.
 *     tags:
 *       - Teachers
 *     responses:
 *       200:
 *         description: Successful response with a list of teachers
 *         content:
 *           application/json:
 *             example:
 *               - idTeacher: 1
 *                 name: John Doe
 *                 subject: Mathematics
 *               - idTeacher: 2
 *                 name: Jane Smith
 *                 subject: Physics
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM teacher;');
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /teachers/{idTeacher}:
 *   get:
 *     summary: Get a specific teacher by ID
 *     description: Retrieve information about a specific teacher by providing their ID.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: idTeacher
 *         description: ID of the teacher to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with the details of the teacher
 *         content:
 *           application/json:
 *             example:
 *               - idTeacher: 1
 *                 name: John Doe
 *                 subject: Mathematics
 *       500:
 *         description: Internal server error
 */
router.get('/:idTeacher', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM teacher WHERE idTeacher = ?;', [req.params.idTeacher]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher
 *     description: Create a new teacher with the provided details.
 *     tags:
 *       - Teachers
 *     parameters:
 *      - in: body
 *        name: teacher
 *        description: The teacher to create
 *        required: true
 *        schema:
 *         items:
 *           $ref: '#/definitions/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Successful response with the ID of the new teacher
 *         content:
 *           application/json:
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        // Access the first (and only) object in the array
        const user = req.body[0];

        // Hash the password
        user.userPassword = await bcrypt.hash(user.userPassword, 10);

        const result = await database.getPromise().query(
            'INSERT INTO teacher (dni, firstName, lastName, phoneNumber, email, userName, userPassword) VALUES (?, ?, ?, ?, ?, ?, ?);',
            [user.dni, user.firstName, user.lastName, user.phoneNumber, user.email, user.userName, user.userPassword]
        );

        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;