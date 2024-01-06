const express = require("express");
const authController = require("../controllers/authController");
const User = require("../models/User"); // Assuming you have a User model
const Admin = require("../models/Admin"); // Assuming you have an Admin model
const validator = require("../middlewares/validator.js")
const userSchema = require("../schemas/user.js")
const adminSchema = require("../schemas/admin.js")

const upload = require("../config/multer")

const router = express.Router();

// User authentication routes
router.post("/user/signup",upload.single('profileImage'),validator(userSchema.userSignupSchema), authController.userSignup);
router.post("/user/login", validator(userSchema.userLoginSchema),async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (!existingUser) {
      // Redirect to signup page if the user doesn't exist
      return res.redirect("/page/user/signup");
    }

    // Proceed with user login if the user exists
    return authController.userLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during user login." });
  }
});

// Admin authentication routes
router.post("/admin/signup",validator(adminSchema.adminSignupSchema), authController.adminSignup);
router.post("/admin/login",validator(adminSchema.adminLoginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      // Redirect to signup page if the admin doesn't exist
      return res.redirect("/page/admin/signup");
    }

    // Proceed with admin login if the admin exists
    return authController.adminLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during admin login." });
  }
});

module.exports = router;
