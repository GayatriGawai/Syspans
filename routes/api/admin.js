const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/login
// @desc    Login an admin
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Received login request with email:', email);

        // Find the admin by email
        const admin = await Admin.findOne({ email });

        console.log('Found admin:', admin);

        if (!admin) {
            console.log('Invalid email');
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        // Check the password
        const isPasswordMatch = await bcrypt.compare(password, admin.password);

        console.log('Password match result:', isPasswordMatch);

        if (!isPasswordMatch) {
            console.log('Invalid password');
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }
        // Create JWT payload
        const payload = {
            admin: {
                id: admin.id,
            },
        };

        // Sign the token
        console.log('JWT Secret:', config.get('jwtSecret'));
        console.log('JWT Payload:', payload);
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 36000 }, //36000 is equivalent to 10 hours and 3600 is 1 hour {we will change it in deployment}
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        // At this point, the login is successful
        // console.log('Login successful');
        // res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
