const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to authenticate users based on JWT
const auth = (req, res, next) => {
    // Retrieve the JWT from the 'x-auth-token' header in the request
  const token = req.header('x-auth-token');

  // If no token is provided, return a 401 status with an error message
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded.user;

    // Call the next middleware function in the stack
    next();

  } catch (err) {

    // If token verification fails, return a 401 status with an error message
    res.status(401).json({ msg: 'Token is not valid' });
    
  }
};

module.exports = auth;
