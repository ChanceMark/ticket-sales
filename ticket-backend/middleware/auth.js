// middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Check for JWT token in headers or cookies
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next(); // Move to next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
