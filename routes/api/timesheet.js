const express = require('express');
const router = express.Router();

// @route   GET api/timesheets
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('timesheet route'));

module.exports = router;
