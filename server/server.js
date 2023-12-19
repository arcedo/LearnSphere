const express = require('express');
const app = express();
//const path = require('path');
const database = require('./app/database/dbConnection.js');

//Server config variables
const port = 3000;
const appRoutes = './app/routes/';
//const appViews = './app/views/';

//Database config
require('dotenv').config();
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'learnSphere',
    password: process.env.DB_PASSWORD || 'y0uNever$ee4CumM4n',
    database: process.env.DB_NAME || 'learnSphere',
    connectionLimit: 10
};

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

//Import routes
const studentsRouter = require(appRoutes + 'students');
const teachersRouter = require(appRoutes + 'teachers');
const projectsRouter = require(appRoutes + 'projects');
const activitiesRouter = require(appRoutes + 'activities');
const skillsRouter = require(appRoutes + 'skills');
const groupsRouter = require(appRoutes + 'groups');

//Server config
app.listen(port, () => console.log(`Listening on port ${port}!\nURL: http://localhost:${port}`));
//app.set('views', path.join(__dirname, appViews + 'views'));
//app.set('view engine', viewEngine);
//app.engine('html', require('ejs').renderFile);

//Routes
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/projects', projectsRouter);
app.use('/activities', activitiesRouter);
app.use('/skills', skillsRouter);
app.use('/groups', groupsRouter);

module.exports = app;