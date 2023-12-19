const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('API Running'));

//Defining the routes

app.use('/api/users', require('./routes/api/users')); // for users
app.use('/api/timesheet', require('./routes/api/timesheet')); //timesheet
app.use('/api/leave', require('./routes/api/leave')); //leave management
app.use('/api/empmng', require('./routes/api/empmng')); //Employee management
app.use('/api/auth', require('./routes/api/auth')); // auth
app.use('/api/attendance', require('./routes/api/attendance')); //Attendance
app.use('/api/announcement', require('./routes/api/announcement')); // Announcement

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Connection
const mongoose = require('mongoose');
const config = require('config');
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
connectDB();
