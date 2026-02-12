const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    'https://kavinraj-70.github.io',
    'https://final-nv5x.onrender.com',
    'https://rs-promoters.vercel.app',
    'https://rs-promoters.netlify.app',
    'https://rspromoters.netlify.app',
    'https://www.rspromoters.netlify.app'
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Root Route
app.get('/', (req, res) => {
  res.send('RS Promoters API is running smoothly!');
});

// Database Connection


// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Import User model for seeding
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');

// Mount Auth Routes
app.use('/api/auth', authRoutes);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Auto-seed Admin User
    try {
      const adminCount = await User.countDocuments();
      if (adminCount === 0) {
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        const admin = new User({ username, password });
        await admin.save();
        console.log(`Default Admin created: ${username} / ${password} (Change this!)`);
      }
    } catch (err) {
      console.error('Error seeding admin:', err);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please close the process using it or try again.`);
    process.exit(1);
  }
});
