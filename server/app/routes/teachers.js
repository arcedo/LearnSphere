const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM teacher;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

router.get('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM teacher WHERE idTeacher = ?;', [req.params.idTeacher]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

module.exports = router;