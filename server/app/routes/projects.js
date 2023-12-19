const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM project;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});
router.get('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM project WHERE idProject = ?;', [req.params.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});
router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'INSERT INTO project (title, description, idTeacher) VALUES (?, ?, ?)',
            [req.body.title, req.body.description, req.body.idTeacher]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.put('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE project SET title = ?, description = ?, idTeacher = ? WHERE idProject = ?;',
            [req.body.title, req.body.description, req.body.idTeacher, req.params.idProject]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

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