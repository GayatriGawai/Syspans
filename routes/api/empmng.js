const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');

// @route   POST api/user
// @desc    Create a new employee
// @access  Public
router.post('/', (req, res) => {
    const newEmployee = new Employee(req.body);
    newEmployee.save().then((employee) => res.json(employee));
});

// @route   GET api/user
// @desc    Get all employees
// @access  Public
router.get('/', (req, res) => {
    Employee.find().then((employees) => res.json(employees));
});

// @route   GET api/user/:id
// @desc    Get employee by ID
// @access  Public
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id).then((employee) => res.json(employee));
});

// @route   PUT api/user/:id
// @desc    Update employee by ID
// @access  Public
router.put('/:id', (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (employee) => res.json(employee)
    );
});

// @route   DELETE api/user/:id
// @desc    Delete employee by ID
// @access  Public
router.delete('/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id).then(() =>
        res.json({ success: true })
    );
});

module.exports = router;
