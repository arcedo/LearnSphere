const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Operations related to student groups
 * definitions:
 *   schemas:
 *     StudentGroup:
 *       description: Student Group Schema
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required: ['name']
 */

/**
 * @swagger
 * /groups:
 *   get:
 *     tags:
 *       - Groups
 *     summary: Get all student groups
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/StudentGroup'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM studentGroup;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /groups:
 *   post:
 *     tags:
 *       - Groups
 *     summary: Create a student group
 *     parameters:
 *       - in: body
 *         name: studentGroup
 *         description: Student group to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/StudentGroup'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/StudentGroup'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'INSERT INTO studentGroup VALUES (?);',
            [req.body.name]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /groups/{idStudentGroup}:
 *   put:
 *     tags:
 *       - Groups
 *     summary: Update a student group by ID
 *     parameters:
 *       - in: path
 *         name: idStudentGroup
 *         description: ID of the student group to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: studentGroup
 *         description: Updated student group information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/StudentGroup'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/StudentGroup'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:idStudentGroup', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE studentGroup SET name = ? WHERE idStudentGroup = ?;',
            [req.body.name, req.params.idStudentGroup]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /groups/{idStudentGroup}:
 *   delete:
 *     tags:
 *       - Groups
 *     summary: Delete a student group by ID
 *     parameters:
 *       - in: path
 *         name: idStudentGroup
 *         description: ID of the student group to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:idStudentGroup', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'DELETE FROM studentGroup WHERE idStudentGroup = ?;',
            [req.params.idStudentGroup]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;