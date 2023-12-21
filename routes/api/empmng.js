const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');
const authMiddleware = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

//Performed the CRUD operations

// @route   POST api/empmng
// @desc    Create a new employee
// @access  Private

router.post(
    '/',
    [
        authMiddleware,
        [
            check('name', 'Name is required').notEmpty(),
            check('status', 'Status is required').notEmpty(),
            check('details.*.address', 'Address is required').notEmpty(),
            check('details.*.phone', 'Phone number is required').notEmpty(),
            check('details.*.email', 'Email address is required').notEmpty(),
            check('designation', 'Designation is required').notEmpty(),
            check('skills', 'Skills is required').notEmpty(),
        ],
    ],
    async (req, res) => {
        try {
            // Checking the validation results
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Generating the uniq ID for employee
            const empID = uuidv4();

            //Checking if the user exists

            const { email } = req.body;
            const oldEmp = await Employee.findOne({
                email: { $regex: new RegExp(email, 'i') },
            });
            if (oldEmp) {
                return res.status(409).json({
                    errors: [
                        {
                            msg: 'Employee already exists, please update if you like',
                        },
                    ],
                });
            }

            const {
                name,
                status,
                details,
                company,
                location,
                designation,
                skills,
                experience,
                education,
                attendance,
            } = req.body;

            const empFields = {
                empID,
                name,
                status: status || 'current',
                details,
                comapny: company || 'Insnpsys',
                location,
                designation,
                skills: skills.split(',').map((skill) => skill.trim()),
                experience,
                education,
                attendance,
            };
            const newEmployee = new Employee(empFields);
            const employee = await newEmployee.save();
            res.json(employee);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

//====================================================================================================

// @route   GET api/empmng
// @desc    Get all employees
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const employees = await Employee.find();

        if (!employees || employees.length === 0) {
            return res.status(404).json({ msg: 'No profiles found' });
        }
        res.json(employees);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//====================================================================================================

// @route   GET api/empmng/:id
// @desc    Get employee by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });
        if (!employee) {
            return res.status(404).json({ msg: 'Emoployee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Emoployee not found' });
        }
        res.status(500).send('Server error');
    }
});

//====================================================================================================
// @route   PUT api/user/:id
// @desc    Update employee by ID
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Emoployee not found' });
        }
        res.status(500).send('Server error');
    }
});
//====================================================================================================
// @route   DELETE api/user/:id
// @desc    Delete employee by ID
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;
