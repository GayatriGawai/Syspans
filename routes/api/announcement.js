const express = require('express');
const router = express.Router();

// @route   GET api/anouncement
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('anouncement route'));

module.exports = router;
