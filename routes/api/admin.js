const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');

// @route   POST api/login
// @desc    Login for admin
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        // Check the password
        const isPasswordMatch = await bcrypt.compare(password, admin.password);

        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        // At this point, the login is successful
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
