const express = require('express');
const app = express();
const database = require('./app/database/dbConnection.js');

const cors = require('cors');
app.use(cors());

// Server config variables
const port = 3001;
const appRoutes = './app/routes/';

// Database config
require('dotenv').config();
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'learnSphere',
    password: process.env.DB_PASSWORD || 'y0uNever$ee4CumM4n',
    database: process.env.DB_NAME || 'learnSphere',
    connectionLimit: 10
};

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.connect(dbConfig, function (err) {
    if (err) {
        console.error('Unable to connect to MySQL: ' + err);
        process.exit(1);
    } else {
        database.get().query('SELECT NOW();', function (err) {
            if (err) {
                console.error('Unable to execute query to MySQL: ' + err);
                process.exit(1);
            } else {
                console.log(`Connected to MySQL ${dbConfig.database} successfully`);
            }
        });
    }
});

// Import routes
const apiDocs = require(appRoutes + 'api-docs');
const studentsRouter = require(appRoutes + 'students');
const teachersRouter = require(appRoutes + 'teachers');
const projectsRouter = require(appRoutes + 'projects');
const activitiesRouter = require(appRoutes + 'activities');
const skillsRouter = require(appRoutes + 'skills');
const groupsRouter = require(appRoutes + 'groups');
const authRouter = require(appRoutes + 'auth');

// Routes
app.use('/', apiDocs);
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/projects', projectsRouter);
app.use('/activities', activitiesRouter);
app.use('/skills', skillsRouter);
app.use('/groups', groupsRouter);
app.use('/auth', authRouter);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    console.log('Request Body:', req.body);
    next();
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Server config
app.listen(port, () => console.log(`Listening on port ${port}!\nURL: http://localhost:${port}`));

module.exports = app;
