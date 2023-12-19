const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Operations related to activities
 * definitions:
 *   schemas:
 *     Activity:
 *       description: Activity Schema
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         idProject:
 *           type: integer
 *       required: ['name', 'description', 'idProject']
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     tags:
 *       - Activities
 *     summary: Get all activities
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM activity;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /activities/{idProject}:
 *   get:
 *     tags:
 *       - Activities
 *     summary: Get activities by project ID
 *     parameters:
 *       - in: path
 *         name: idProject
 *         description: ID of the project to retrieve activities for
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM activity WHERE idProject = ?;', [req.params.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /activities:
 *   post:
 *     tags:
 *       - Activities
 *     summary: Create an activity
 *     parameters:
 *       - in: body
 *         name: activity
 *         description: Activity to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('INSERT INTO activity (name, description, idProject) VALUES (?, ?, ?)', [req.body.name, req.body.description, req.body.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});


/**
 * @swagger
 * /activities/{idActivity}:
 *   put:
 *     tags:
 *       - Activities
 *     summary: Update an activity by ID
 *     parameters:
 *       - in: path
 *         name: idActivity
 *         description: ID of the activity to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: activity
 *         description: Updated activity information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:idActivity', async (req, res) => {
    try {
        const result = await database.getPromise().query('UPidProject = ? DATE activity SET name = ?, description = ? WHERE idActivity = ?;', [req.body.name, req.body.description, req.params.idActivity]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /activities/{idActivity}:
 *   delete:
 *     tags:
 *       - Activities
 *     summary: Delete an activity by ID
 *     parameters:
 *       - in: path
 *         name: idActivity
 *         description: ID of the activity to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:idActivity', async (req, res) => {
    try {
        const result = await database.getPromise().query('DELETE FROM activity WHERE idActivity = ?;', [req.params.idActivity]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();

    }
});

/**
 * @swagger
 * /activities/{idActivity}/skills/:
 *   get:
 *     tags:
 *       - Activities
 *     summary: Get skills for an activity
 *     parameters:
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
 *             $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idActivity/skills/', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT * FROM activityPercentatge WHERE idActivity = ?;',
            [req.params.idActivity]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();

    }
});

/**
 * @swagger
 * /activities/{idActivity}/skills/:
 *   post:
 *     tags:
 *       - Activities
 *     summary: Add a skill to an activity
 *     parameters:
 *       - in: path
 *         name: idActivity
 *         description: ID of the activity
 *         required: true
 *         type: integer
 *       - in: body
 *         name: skill
 *         description: Skill to add to the activity
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.post('/:idActivity/skills/', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'INSERT INTO activityGrade (idActivity, idSkill, grade) VALUES (?, ?, ?)',
            [req.params.idActivity, req.body.idSkill, req.body.grade]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
    }
});

/**
 * @swagger
 * /activities/{idActivity}/skills/{idSkill}:
 *   put:
 *     tags:
 *       - Activities
 *     summary: Update a skill grade for an activity
 *     parameters:
 *       - in: path
 *         name: idActivity
 *         description: ID of the activity
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
 *           $ref: '#/definitions/schemas/Activity'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:idActivity/skills/:idSkill', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE activityGrade SET grade = ? WHERE idActivity = ? AND idSkill = ?;',
            [req.body.grade, req.params.idActivity, req.params.idSkill]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);

    }
});

/**
 * @swagger
 * /activities/{idActivity}/skills/{idSkill}:
 *   delete:
 *     tags:
 *       - Activities
 *     summary: Remove a skill from an activity
 *     parameters:
 *       - in: path
 *         name: idActivity
 *         description: ID of the activity
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
router.delete('/:idActivity/skills/:idSkill', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'DELETE FROM activityGrade WHERE idActivity = ? AND idSkill = ?;',
            [req.params.idActivity, req.params.idSkill]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
    }
});

module.exports = router;