const mongoose = require('mongoose');

const AttendanceRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    clockInTime: {
        type: Date,
        required: true,
    },
    clockOutTime: {
        type: Date,
    },
    totalHours: {
        type: Number,
    },
});

const AttendanceRecord = mongoose.model(
    'AttendanceRecord',
    AttendanceRecordSchema
);

module.exports = AttendanceRecord;
