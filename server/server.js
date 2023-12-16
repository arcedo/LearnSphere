const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const viewsPath = './routes/views';
const viewEngine = 'html';

//
const studentsRouter = require('./routes/students');
const teachersRouter = require('./routes/teachers');

app.listen(port, () => console.log(`Listening on port ${port}!`));
app.set('views', path.join(__dirname, viewsPath));
//app.set('view engine', viewEngine);
//app.engine('html', require('ejs').renderFile);


app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);

module.exports = app;