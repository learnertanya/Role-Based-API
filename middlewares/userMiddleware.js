const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Check if the 'Authorization' header is present in the request
    if (!req.cookies.jwt) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided." });
    }

    //Extract the JWT Token from cookies
    const token = req.cookies.jwt


    // Check if the token is present
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided." });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, "userSecretKey"); // Use the same key used for signing the token

    // Check if the decoded token contains userId
    if (!decodedToken.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token." });
    }

    // Check if the user exists in the database
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not found." });
    }

    // Attach the userId to the request for later use
    req.userId = decodedToken.userId;
    req.role="user";
    req.user = user
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token." });
  }
};
