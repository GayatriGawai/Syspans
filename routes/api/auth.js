const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');

// Protected route using authMiddleware
router.get('/', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;
