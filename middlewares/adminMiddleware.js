const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
  try {
    // Check if the 'Authorization' header is present in the request
    if (!req.cookies.jwt) {
      return res.status(401).json({ message: 'Unauthorized - No token provided.' });
    }

    // Extract the token from the 'Authorization' header
    const token = req.cookies.jwt

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided.' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, 'adminSecretKey'); // Use the same key used for signing the token

    // Check if the decoded token contains adminId
    if (!decodedToken.adminId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
    }

    // Check if the admin exists in the database
    const admin = await Admin.findById(decodedToken.adminId);

    if (!admin) {
      return res.status(401).json({ message: 'Unauthorized - Admin not found.' });
    }

    // Attach the adminId to the request for later use
    req.adminId = decodedToken.adminId;
    req.role = "admin"
    req.admin = admin
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token.' });
  }
};
