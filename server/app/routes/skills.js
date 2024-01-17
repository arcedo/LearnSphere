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
 *         idProject:
 *          type: integer
 *       required: ['skillName', 'idProject']
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

/**
 * @swagger
 * /skills:
 *   post:
 *     tags:
 *       - Skills
 *     summary: Create a skill
 *     parameters:
 *       - in: body
 *         name: skill
 *         description: Skill object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Skill'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Project'
 *       500:
 *         description: Internal Server Error
 */

const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../client/src/assets/skillIcons/'));
    },
    filename: function (req, file, cb) {
        const fileName = req.body.skillName + '_' + new Date().getTime();

        // Force the file extension to be '.png'
        const newFilename = `${fileName}.png`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Get the uploaded file information
        const uploadedFile = req.file;

        // Assuming you have other fields in the request body
        const { idProject, skillName } = req.body;

        // Use the uploaded file path or filename as needed in your database query
        const imagePath = `/src/assets/skillIcons/${uploadedFile.filename}`;
        const sameName = await database.getPromise().query('SELECT * FROM skill WHERE skillName = ? AND idProject = ?;', [skillName, idProject]);
        // Insert data into the database
        if (sameName[0].length === 0) {
            const result = await database.getPromise().query(
                'INSERT INTO skill (idProject, skillName, image) VALUES (?, ?, ?);',
                [idProject, skillName, imagePath]
            );
            res.status(200).json(result[0]); // Assuming result is an array of rows
        } else {
            res.status(500).send();
        }

    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});


// route to update skill by ID
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../client/src/assets/skillIcons/'));
    },
    filename: function (req, file, cb) {
        const fileName = req.body.skillName + '_' + new Date().getTime();

        // Force the file extension to be '.png'
        const newFilename = `${fileName}.png`;
        cb(null, newFilename);
    }
});

const upload2 = multer({ storage: storage2 });

router.put('/:idSkill', upload2.single('image'), async (req, res) => {
    try {
        const idSkill = req.params.idSkill;
        // Get the uploaded file information
        const uploadedFile = req.file;
        // Assuming you have other fields in the request body
        const { idProject, skillName } = req.body;

        if (uploadedFile == null) {
            const { idProject, skillName } = req.body;
            const result = await database.getPromise().query(
                'UPDATE skill SET skillName = ?, idProject = ? WHERE idSkill = ?;',
                [skillName, idProject, idSkill]
            );
            res.status(200).json(result[0]);
            return;
        } else {
            // Use the uploaded file path or filename as needed in your database query
            const imagePath = `/src/assets/skillIcons/${uploadedFile.filename}`;

            const result = await database.getPromise().query(
                'UPDATE skill SET skillName = ?, idProject = ?, image = ? WHERE idSkill = ?;',
                [skillName, idProject, imagePath, idSkill]
            );
            res.status(200).json(result[0]);
            return;
        }
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /skills/{idSkill}:
 *   delete:
 *     tags:
 *       - Skills
 *     summary: Delete a skill by ID
 *     parameters:
 *       - in: path
 *         name: idSkill
 *         description: ID of the skill to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:idSkill', async (req, res) => {
    try {
        const idSkill = req.params.idSkill;
        await database.getPromise().query('DELETE FROM activityPercentatge WHERE idSkill = ?;', [idSkill]);
        await database.getPromise().query('DELETE FROM activityGrade WHERE idSkill = ?;', [idSkill]);
        const result = await database.getPromise().query('DELETE FROM skill WHERE idSkill = ?;', [idSkill]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;