const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM activity;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.get('/:idProject', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM activity WHERE idProject = ?;', [req.params.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('INSERT INTO activity (name, description, idProject) VALUES (?, ?, ?)', [req.body.name, req.body.description, req.body.idProject]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.put('/:idActivity', async (req, res) => {
    try {
        const result = await database.getPromise().query('UPidProject = ? DATE activity SET name = ?, description = ? WHERE idActivity = ?;', [req.body.name, req.body.description, req.params.idActivity]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.delete('/:idActivity', async (req, res) => {
    try {
        const result = await database.getPromise().query('DELETE FROM activity WHERE idActivity = ?;', [req.params.idActivity]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();

    }
});


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