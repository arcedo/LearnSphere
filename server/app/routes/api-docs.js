'use strict';

const express = require('express');
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: '0.1',
            title: 'LearnSphere API',
            description: 'A web app for students and teachers to manage and view activities/projects with some gamification',
            contact: {
                email: "arcedo.marc@gmail.com"
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/license/mit/'
            },
            servers: ['http://localhost:3000']
        }
    },
    // APIs to document
    apis: [
        './app/routes/teachers.js',
        './app/routes/students.js',
        './app/routes/activities.js',
        './app/routes/projects.js',
        './app/routes/groups.js',
        './app/routes/skills.js',
        './app/routes/auth.js',
    ]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;