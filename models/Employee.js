const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            'current',
            'former',
            'terminated',
            'absconded',
            'trainee',
            'intern',
        ],
        required: true,
    },
    details: [
        {
            address: {
                type: String,
                required: true,
            },
            phone: {
                type: Number,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
        },
    ],
    company: {
        type: String,
        default: 'Insnapsys',
    },
    location: {
        type: String,
    },
    designation: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: [
        {
            title: {
                type: String,
            },
            company: {
                type: String,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    attendance: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AttendanceRecord',
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Employee = mongoose.model('Employee', EmployeeSchema);
