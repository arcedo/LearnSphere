const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Operations related to students
 * definitions:
 *   schemas:
 *     Student:
 *       description: Student Schema
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
 *         profilePicture:
 *           type: string
 *         bio:
 *           type: string
 *         idStudentGroup:
 *           type: string
 *       required: ['dni', 'firstName', 'lastName', 'phoneNumber', 'email', 'userName', 'userPassword', 'profilePicture', 'bio', 'idStudentGroup']
 */


/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM student;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /students/{idStudent}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idStudent', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM student WHERE idStudent = ?;', [req.params.idStudent]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 *  @swagger
 * /students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Create multiple students
 *     parameters:
 *       - in: body
 *         name: students
 *         description: Array of students to create
 *         required: true
 *         schema:
 *           type: array
 *           properties:
 *             students:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/schemas/Student'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        const students = req.body.students;
        const values = students.map(student => [
            student.dni,
            student.firstName,
            student.lastName,
            student.phoneNumber,
            student.email,
            student.userName,
            student.userPassword,
            student.profilePicture,
            student.bio,
            student.idStudentGroup
        ]);

        const sql = 'INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup) VALUES ?';
        const result = await database.getPromise().query(sql, [values]);

        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /students/{idStudent}:
 *   put:
 *     tags:
 *       - Students
 *     summary: Update a student by ID
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: student
 *         description: Updated student information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Student'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE student SET dni = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ?, userName = ?, userPassword = ?, profilePicture = ?, bio = ?, idStudentGroup = ? WHERE idStudent = ?;',
            [req.body.dni, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.userName, req.body.userPassword, req.body.profilePicture, req.body.bio, req.body.idStudentGroup, req.params.id]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /students/{idStudent}:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'DELETE FROM student WHERE idStudent = ?;',
            [req.params.id]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /students/{idStudent}/{idProject}/grade:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get the grade for a student on a project
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student
 *         required: true
 *         type: integer
 *       - in: path
 *         name: idProject
 *         description: ID of the project
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               projectGrade:
 *                 type: integer
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idStudent/:idProject/grade', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT projectGrade FROM projectToStudent WHERE idStudent = ? AND idProject = ?;',
            [req.params.idStudent, req.params.idProject]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /students/{idStudent}/{idActivity}/grade:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get the grade for a student on an activity
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student
 *         required: true
 *         type: integer
 *       - in: path
 *         name: idActivity
 *         description: ID of the activity
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               grade:
 *                 type: integer
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idStudent/:idActivity/grade', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT grade FROM activityGrade WHERE idStudent = ? AND idActivity = ?;',
            [req.params.idStudent, req.params.idActivity]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;