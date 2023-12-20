const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Operations related to projects
 * definitions:
 *   schemas:
 *     Project:
 *       description: Project Schema
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         idTeacher:
 *           type: integer
 *         idStudentGroup:
 *           type: string
 *       required: ['title', 'description', 'idTeacher', 'idStudentGroup']
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM project;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /projects/{idProject}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get a project by ID
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM project WHERE idProject = ?;', [req.params.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a project
 *     parameters:
 *       - in: body
 *         name: project
 *         description: Project to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Project'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'INSERT INTO project (title, description, idTeacher, idStudentGroup) VALUES (?, ?, ?, ?);',
            [req.body.title, req.body.description, req.body.idTeacher, req.body.idStudentGroup]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/{idProject}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update a project by ID
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: project
 *         description: Updated project information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Project'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE project SET title = ?, description = ?, idTeacher = ?, idStudentGroup = ?, WHERE idProject = ?;',
            [req.body.title, req.body.description, req.body.idTeacher, req.body.idStudentGroup, req.params.idProject]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/{idProject}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete a project by ID
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'DELETE FROM project WHERE idProject = ?;',
            [req.params.idProject]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/group/{idStudentGroup}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get projects by student group ID
 *     parameters:
 *       - in: path
 *         name: idStudentGroup
 *         description: ID of the student group
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */
router.get('/group/:idStudentGroup', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT * FROM project WHERE idStudentGroup = ?;',
            [req.params.idStudentGroup]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/group/{idStudentGroup}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get projects by student group ID
 *     parameters:
 *       - in: path
 *         name: idStudentGroup
 *         description: ID of the student group
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idProject/skills', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT * FROM skill WHERE idProject = ?',
            [req.params.idProject]
        );
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/{idProject}/skills:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a skill for a project
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project
 *         required: true
 *         type: integer
 *       - in: body
 *         name: skill
 *         description: Skill to add to the project
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Skill'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Skill'
 *       500:
 *         description: Internal Server Error
 */
router.post('/:idProject/skills', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'INSERT INTO skill (skillName, idProject, globalPercentage) VALUES (?, ?, ?);',
            [req.body.skillName, req.params.idProject, req.body.globalPercentage]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/{idProject}/skills/{idSkill}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update a skill for a project
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project
 *         required: true
 *         type: integer
 *       - in: path
 *         name: idSkill
 *         description: ID of the skill
 *         required: true
 *         type: integer
 *       - in: body
 *         name: skill
 *         description: Updated skill information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Skill'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Skill'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:idProject/skills/:idSkill', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE skill SET skillName = ?, globalPercentage = ? WHERE idSkill = ? AND idProject = ?;',
            [req.body.skillName, req.body.globalPercentage, req.params.idSkill, req.params.idProject]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /projects/{idProject}/skills/{idSkill}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Remove a skill from a project
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project
 *         required: true
 *         type: integer
 *       - in: path
 *         name: idSkill
 *         description: ID of the skill
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete(':/idProject/skills/:idSkill', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'DELETE FROM skill WHERE idSkill = ? AND idProject = ?;',
            [req.params.idSkill, req.params.idProject]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();

    }
});

module.exports = router;