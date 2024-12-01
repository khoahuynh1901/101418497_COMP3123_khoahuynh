const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

// Register User
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
