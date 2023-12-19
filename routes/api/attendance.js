const express = require('express');
const router = express.Router();

// @route   GET api/attendance
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('Attendance route'));

module.exports = router;
