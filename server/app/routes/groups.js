const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM studentGroup;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'INSERT INTO studentGroup (name) VALUES (?)',
            [req.body.name]
        );
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

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