const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const userController = require('../controllers/userController');
const validator = require("../middlewares/validator")
const userSchema = require("../schemas/user")
const upload = require("../config/multer")

const router = express.Router();

// Middleware: Ensure user authentication for the following routes
router.use(userMiddleware);

// Route: Get user profile
router.get('/profile', (req, res) => {
  // Check if the user is logged in and has an account
  if (req.role  === 'user') {
    return userController.getUserProfile(req, res);
  } else {
    return res.status(403).json({ message: 'Unauthorized - User access only' });
  }
});

// Route: Update user details
router.post('/update',upload.single('profileImage'),validator(userSchema.userUpdateSchema), (req, res) => {
  // Check if the user is logged in and has an account
  if (req.role === 'user') {
    return userController.modifyUser(req, res);
  } else {
    return res.status(403).json({ message: 'Unauthorized - User access only' });
  }
});

// Route: Delete user account
router.post('/delete', (req, res) => {
  // Check if the user is logged in and has an account
  if (req.role === 'user') {
    return userController.deleteUser(req, res);
  } else {
    return res.status(403).json({ message: 'Unauthorized - User access only' });
  }
});

//Route: Logout user
router.post('/logout',(req,res) => {
  if(req.role === 'user') {
    return userController.logoutUser(req,res);
  } else {
    return res.status(403).json({message : 'Unauthorized - User access only'})
  }
})

module.exports = router;
