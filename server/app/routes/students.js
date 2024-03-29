const express = require('express');
const router = express.Router();
const database = require('../database/dbConnection.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Operations related to students
 * definitions:
 *   schemas:
 *     Student:
 *       description: Student Schema
 *       type: object
 *       properties:
 *         dni:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: integer
 *         email:
 *           type: string
 *         userName:
 *           type: string
 *         userPassword:
 *           type: string
 *         profilePicture:
 *           type: string
 *         bio:
 *           type: string
 *         idStudentGroup:
 *           type: string
 *       required: ['dni', 'firstName', 'lastName', 'phoneNumber', 'email', 'userName', 'userPassword', 'profilePicture', 'bio', 'idStudentGroup']
 */


/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */

router.get('/', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM student;');
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /students/{idStudent}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idStudent', async (req, res) => {
    try {
        const result = await database.getPromise().query('SELECT * FROM student WHERE idStudent = ?;', [req.params.idStudent]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 *  @swagger
 * /students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Create multiple students
 *     parameters:
 *       - in: body
 *         name: students
 *         description: Array of students to create
 *         required: true
 *         schema:
 *           type: array
 *           properties:
 *             students:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/schemas/Student'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */
const fs = require('fs');
const path2 = require('path');

router.post('/', async (req, res) => {
    try {
        const students = req.body.students;
        const values = await Promise.all(students.map(async (student) => {
            const hashedPassword = await bcrypt.hash(student.userPassword, saltRounds);
            return [
                student.dni,
                student.firstName,
                student.lastName,
                student.phoneNumber,
                student.email,
                student.userName,
                hashedPassword,
                `/src/assets/profilePictures/${student.userName}.png`,
                student.bio,
                student.idStudentGroup
            ];
        }));
        const defaultImagePath = path2.join(__dirname, '../../../client/src/assets/profilePictures/default.png');
        const profilePicturePath = path2.join(__dirname, '../../../client/src/assets/profilePictures/');
        values.forEach(async (student) => {
            const newImagePath = path.join(profilePicturePath, `${student[5]}.png`);
            if (!fs.existsSync(newImagePath)) {
                fs.copyFileSync(defaultImagePath, newImagePath);
            }
        });


        const sql = 'INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup) VALUES ?';
        const result = await database.getPromise().query(sql, [values]);

        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});

// CSV part

const multer2 = require('multer');
const fs2 = require('fs');

const storage2 = multer2.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'csvUploads/'); // Define your upload destination
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload2 = multer2({ storage: storage2 });

router.post('/csv', upload2.single('csv'), async (req, res) => {
    try {
        const csvFilePath = req.file.path;
        const students = await fs2.promises.readFile(csvFilePath, 'utf-8')
            .then(data => {
                const rows = data.trim().split('\n');
                const headers = rows[0].split(',');

                return Promise.all(rows.slice(1).map(async row => {
                    const values = row.split(',');
                    const student = {};

                    headers.forEach((header, index) => {
                        student[header] = values[index];
                    });

                    const firstNameShort = student.firstName.substring(0, 3).toLowerCase();
                    const lastNameShort = student.lastName.substring(0, 3).toLowerCase();

                    const userName = `${firstNameShort}${lastNameShort}`;
                    const email = `${userName}@lsphere.net`;

                    const profilePicturePath = `/src/assets/profilePictures/${userName}.png`;
                    const hashedPassword = await bcrypt.hash(student.userPassword, saltRounds);

                    return [
                        student.dni,
                        student.firstName,
                        student.lastName,
                        parseInt(student.phoneNumber),
                        email,
                        userName,
                        hashedPassword,
                        profilePicturePath,
                        student.bio,
                        student.idStudentGroup,
                    ];
                }));
            });

        const defaultImagePath = path.join(__dirname, '../../../client/src/assets/profilePictures/default.png');
        const profilePicturePath = path.join(__dirname, '../../../client/src/assets/profilePictures/');

        await Promise.all(students.map(async (student) => {
            const newImagePath = path.join(profilePicturePath, `${student[5]}.png`);
            if (!fs.existsSync(newImagePath)) {
                fs.copyFileSync(defaultImagePath, newImagePath);
            }
        }));

        const sql = 'INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup) VALUES ?';
        const result = await database.getPromise().query(sql, [students]);

        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to import students from CSV: ' + err);
        console.error(err.stack);
        res.status(500).send();
    }
});


/**
 * @swagger
 * /students/{idStudent}:
 *   put:
 *     tags:
 *       - Students
 *     summary: Update a student by ID
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: student
 *         description: Updated student information
 *         required: true
 *         schema:
 *           $ref: '#/definitions/schemas/Student'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/schemas/Student'
 *       500:
 *         description: Internal Server Error
 */

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../client/src/assets/profilePictures/'));
    },
    filename: function (req, file, cb) {
        const user = req.body.userName;

        // Force the file extension to be '.png'
        const newFilename = `${user}.png`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

router.put('/:id', upload.single('profilePicture'), async (req, res) => {
    try {
        // Assuming req.params.id is the user ID
        const userId = req.params.id;
        // Check if the user provided a new password
        if (req.body.userPassword) {
            // Hash the new password
            req.body.userPassword = await bcrypt.hash(req.body.userPassword, saltRounds);
        }
        // Check if a file is uploaded
        if (req.file && req.file.filename) {
            // Handle updating other user data in the database here
            const result = await database.getPromise().query(
                'UPDATE student SET dni = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ?, userName = ?, userPassword = ?, bio = ?, idStudentGroup = ? WHERE idStudent = ?;',
                [req.body.dni, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.userName, req.body.userPassword, req.body.bio, req.body.idStudentGroup, userId]);

            // Send a success response
            res.status(200).json({ message: 'Profile picture and other data updated successfully' });
        } else {
            const result = await database.getPromise().query(
                'UPDATE student SET dni = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ?, userName = ?, userPassword = ?, bio = ?, idStudentGroup = ? WHERE idStudent = ?;',
                [req.body.dni, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.userName, req.body.userPassword, req.body.bio, req.body.idStudentGroup, userId]);
            res.status(200).json({ message: 'Other data updated successfully' });

        }
    } catch (err) {
        console.error('Error updating profile picture and other data:', err);
        res.status(500).send('Internal Server Error');
    }
});


/**
 * @swagger
 * /students/{idStudent}:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req, res) => {
    try {
        const idStudent = req.params.id;
        await database.getPromise().query('DELETE FROM activityGrade WHERE idStudent = ?;', [idStudent]);
        await database.getPromise().query('DELETE FROM projectToStudent WHERE idStudent = ?;', [idStudent]);
        const result = await database.getPromise().query('DELETE FROM student WHERE idStudent = ?;', [idStudent]);
        res.status(200).json(result[0]); // Assuming result is an array of rows
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    };
});

/**
 * @swagger
 * /students/{idStudent}/{idProject}/grade:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get the grade for a student on a project
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student
 *         required: true
 *         type: integer
 *       - in: path
 *         name: idProject
 *         description: ID of the project
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               projectGrade:
 *                 type: integer
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /students/{idStudent}/{idActivity}/grade:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get the grade for a student on an activity
 *     parameters:
 *       - in: path
 *         name: idStudent
 *         description: ID of the student
 *         required: true
 *         type: integer
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
 *             type: object
 *             properties:
 *               grade:
 *                 type: integer
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /students/{idStudentGroup}/{idActivity}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get the grade for a student on an activity
 *     parameters:
 *       - in: path
 *         name: idStudentGroup
 *         description: ID of the student
 *         required: true
 *         type: string
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
 *             type: object
 *             properties:
 *               grade:
 *                 type: integer
 *       500:
 *         description: Internal Server Error
 */
router.get('/:idStudentGroup/:idActivity', async (req, res) => {
    try {
        const result = await database.getPromise().query(
            `SELECT * 
            FROM student s 
            JOIN activityGrade ag ON s.idStudent = ag.idStudent  
            WHERE s.idStudentGroup = ? AND ag.idActivity = ?;`,
            [req.params.idStudentGroup, req.params.idActivity]);
        // Transform the result into the desired format
        const transformedResult = result[0].reduce((acc, student) => {
            // Check if the student already exists in the transformed result
            const existingStudent = acc.find(item => item.idStudent === student.idStudent);

            if (existingStudent) {
                // Student exists, add the skill and grade to the existing array
                existingStudent.skills.push({
                    idSkill: student.idSkill,
                    grade: student.grade
                });
            } else {
                // Student doesn't exist, create a new entry with an array of skills
                acc.push({
                    idStudent: student.idStudent,
                    dni: student.dni,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    phoneNumber: student.phoneNumber,
                    email: student.email,
                    userName: student.userName,
                    userPassword: student.userPassword,
                    profilePicture: student.profilePicture,
                    bio: student.bio,
                    idStudentGroup: student.idStudentGroup,
                    skills: [{
                        idSkill: student.idSkill,
                        grade: student.grade
                    }]
                });
            }

            return acc;
        }, []);
        res.status(200).json(transformedResult);
    } catch (err) {
        console.error('Unable to execute query to MySQL: ' + err);
        res.status(500).send();
    }
});


module.exports = router;