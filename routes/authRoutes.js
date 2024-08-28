const express = require('express');
const router = express.Router();

// Import the signup and login controller functions from the authController module
const { signup, login } = require('../controllers/authControllers');

// This route maps to the signup function in the authController
// @route POST /signup
router.post('/signup', signup);

// This route maps to the login function in the authController
// @route POST /login
router.post('/login', login);

module.exports = router;