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
        const result = await database.getPromise().query('INSERT INTO project (title, description, idTeacher) VALUES (?, ?, ?)', [req.body.title, req.body.description, req.body.idTeacher]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.put('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query('UPDATE project SET title = ?, description = ?, idTeacher = ? WHERE idProject = ?;', [req.body.title, req.body.description, req.body.idTeacher, req.params.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('DELETE FROM project WHERE idProject = ?;', [req.params.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

//Get all the projects that one student groups can access
router.get('/:idStudentGroup', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM project WHERE idStudentGroup = ?;', [req.params.idStudentGroup]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;