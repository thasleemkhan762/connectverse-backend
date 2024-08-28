const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Controller function for user signup
exports.signup = asyncHandler (async (req, res) => {
  // Extract username, email, and password from the request body 
  const { username, email, password } = req.body;

  try {
    // Check if a user with the given email already exists
    let user = await User.findOne({ email });
    if (user) {
        // Return a 400 status and error message if user already exists
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user with the provided details
    user = new User({ username, email, password });

    // Save the new user to the database
    await user.save();

    // Create a payload for the JWT, including the user's ID
    const payload = { user: { id: user.id } };

    // Sign the payload with a JWT secret and set an expiration time of 1 hour
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {

      if (err) throw err; // Throw error if signing fails

      // Return the JWT token in the response
      return res.status(200).json({message: "User Registered Successfully", user, token });

    });
  } catch (err) {

    // Log the error message and return a 500 status with a server error message
    console.error(err.message);
    res.status(500).send('Server error');

  }
});

// Controller function for user login
exports.login = asyncHandler (async (req, res) => {
   // Extract email and password from the request body
   const { email, password } = req.body;

   try {
 
     // Find a user with the given email
     let user = await User.findOne({ email });
     if (!user) {
 
         // Return a 400 status and error message if user does not exist
       return res.status(400).json({ msg: 'Invalid credentials' });
     }
 
     // Compare the provided password with the stored hashed password
     const isMatch = await user.matchPassword(password);
     if (!isMatch) {
       // Return a 400 status and error message if passwords do not match
       return res.status(400).json({ msg: 'Invalid credentials' });
     }
 
     // Create a payload for the JWT, including the user's ID
     const payload = { user: { id: user.id } };
 
     // Sign the payload with a JWT secret and set an expiration time of 1 hour
     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
       if (err) throw err;
 
       // Return the JWT token in the response
       return res.status(200).json({message: "User Login Successfull", user, token });
 
     });
   } catch (err) {
 
     // Log the error message and return a 500 status with a server error message
     console.error(err.message);
     res.status(500).send('Server error');
     
   }
});
