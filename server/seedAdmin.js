const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = new User({
            username,
            password // Password will be hashed by UserSchema pre-save hook
        });

        await admin.save();
        console.log(`Admin user created successfully: ${username}`);
        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
