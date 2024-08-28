const express = require('express');

// Import the database connection function from the config directory
const connectDB = require('./config/db');

// Import the authentication routes from the routes directory
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Connect to the MongoDB database using the connectDB function
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register the authentication routes under the '/api/auth' path
app.use('/api/auth', authRoutes);

// Define the port to listen on (either from environment variables or default to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
