const express = require('express');
const router = express.Router();

// @route   GET api/user
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('Employee management route'));

module.exports = router;
