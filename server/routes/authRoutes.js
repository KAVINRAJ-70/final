const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || 'fallbacksecret', {
            expiresIn: '7d', // 1 week session
        });

        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Register/Seed Route (Protected or One-time use)
// In a real app, you'd protect this. For now, we'll check if any user exists or match a secret.
router.post('/seed-admin', async (req, res) => {
    try {
        const secret = req.body.adminSecret;
        if (secret !== process.env.ADMIN_SECRET) {
            return res.status(403).json({ error: 'Unauthorized to seed admin' });
        }

        const { username, password } = req.body;

        // Check if exists
        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ message: 'Admin created', user });

    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
