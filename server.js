const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

// Enable CORS for all routes
// Enable CORS for specific origins
const corsOptions = {
    origin: 'http://localhost:3000', // Change this to the actual origin of your front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Defining the routes
app.use('/api', require('./routes/api/admin')); // for admin
// app.use('/api/employee', require('.routes/api/employee'));
app.use('/api/auth', require('./routes/api/auth')); // auth
app.use('/api/timesheet', require('./routes/api/timesheet')); // timesheet
app.use('/api/leave', require('./routes/api/leave')); // leave management
app.use('/api/employees', require('./routes/api/employees')); // Employee management
app.use('/api/attendance', require('./routes/api/attendance')); // Attendance
app.use('/api/announcement', require('./routes/api/announcement')); // Announcement

const PORT = process.env.PORT || 5000;

// Connection to MongoDB
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connection established');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
