'use strict';
// src/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const taskRoute = require('./app/routes/taskRoute');
const connectDB = require('./config/db/connect');
const dotenv = require('dotenv');
const path = require('path');
const notFound = require('./app/middlewares/not-found');
const errorHandlerMiddleware = require('./app/middlewares/error-handler');

dotenv.config();

// Middleware
app.use(express.static(path.join(__dirname, './public'))); // Serve static files from the public directory
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

// Connect to the database
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();