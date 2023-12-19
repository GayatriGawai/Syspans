const express = require('express');
const router = express.Router();

// @route   GET api/leave
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('leave route'));

module.exports = router;
