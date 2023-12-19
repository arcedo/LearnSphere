const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');


//Get all the students data
router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM student;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

//Get a specific (by id) student data
router.get('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM student WHERE idStudent = ?;', [req.params.idStudent]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

router.post('/', async (req, res) => {
    try {
        const students = req.body.students;
        const values = students.map(student => [
            student.dni,
            student.firstName,
            student.lastName,
            student.phoneNumber,
            student.email,
            student.userName,
            student.userPassword
        ]);

        const sql = 'INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword) VALUES ?';
        const result = await database.getPromise().query(sql, [values]);

        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'UPDATE student SET dni = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ?, userName = ?, userPassword = ? WHERE idStudent = ?;',
            [req.body.dni, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.userName, req.body.userPassword, req.params.id]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'DELETE FROM student WHERE idStudent = ?;',
            [req.params.id]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

//Get the grade from one student on one project
router.get('/:idStudent/:idProject/grade', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT projectGrade FROM projectToStudent WHERE idStudent = ? AND idProject = ?;',
            [req.params.idStudent, req.params.idProject]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

//TODO: Get the grade from one student on one activity
// we need all the skills to calculate the grade but right now we have just one skill in the table activityGrade
router.get('/:idStudent/:idActivity/grade', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            'SELECT grade FROM activityGrade WHERE idStudent = ? AND idActivity = ?;',
            [req.params.idStudent, req.params.idActivity]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

module.exports = router;