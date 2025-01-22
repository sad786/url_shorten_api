require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db') // Database Connection

const redisClient = require('./config/redis'); // Redis Connection

const authRoutes = require('./routes/authRoutes') // Authentication Routes

const urlRoutes = require('./routes/urlRoutes') // URL-related routes

const analyticsRoutes = require('./routes/analyticsRoutes'); // Analytics routes

const { verifyToken } = require('./middlewares/auth') // JWT middleware

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

app.use('/api/auth', authRoutes); // Authentication

app.use('/api/url', verifyToken, urlRoutes); // URL Shortening (protected)

app.use('/api/analytics',verifyToken,analyticsRoutes); // Analytics (protected)

// Connect to MongoDB
connectDB();

// Connect to Redis
redisClient.on('connect', () => console.log('Redis connected'));

redisClient.on('error', (err) => console.error('Redis error: ',err)); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));