const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Operations related to skills
 * definitions:
 *   schemas:
 *     Skill:
 *       description: Skill Schema
 *       type: object
 *       properties:
 *         skillName:
 *           type: string
 *         globalPercentage:
 *           type: integer
 *       required: ['skillName', 'idProject', 'globalPercentage']
 */

/**
 * @swagger
 * /skills:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get all skills
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Skill'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM skill;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /skills/{idSkill}:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get a skill by ID
 *     parameters:
 *       - in: path
 *         name: idSkill
 *         description: ID of the skill to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Skill'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM skill WHERE idSkill = ?;', [req.params.idSkill]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;