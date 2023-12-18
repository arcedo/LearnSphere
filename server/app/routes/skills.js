const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM skill;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

router.get('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM skill WHERE idSkill = ?;', [req.params.idSkill]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('INSERT INTO skill (skillName, idProject, globalPercentage) VALUES (?, ?, ?);', [req.body.skillName, req.body.idProject, req.body.globalPercentage]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('UPDATE skill SET skillName = ?, idProject = ?, globalPercentage = ? WHERE idSkill = ?;', [req.body.skillName, req.body.idProject, req.body.globalPercentage, req.params.idSkill]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('DELETE FROM skill WHERE idSkill = ?;', [req.params.idSkill]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();

    }
});

module.exports = router;