const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");

const deleteImage = require("../utils/deleteImage")

exports.logoutAdmin = async(req,res) => {
  try {
    res.clearCookie('jwt');
    return res.redirect(301,"/")
  } catch(err) {
    console.error(err);
    res.status(500).json({message : "Error logging out"})
  }
}

exports.viewAllUsers = async (req, res) => {
  try {
    // Get all user details
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user details." });
  }
};

exports.modifyUserDetails = async (req, res) => {
  try {
    // Extract user ID and details from request
    const { userId, name } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Modify user details
    if (name) {
      user.name = name;
    }

    if (req.file) {
      await deleteImage(req,res,user.profileImage)
      user.profileImage = req.file.filename
    }

    // Save the modified user details
    await user.save();
    return res.redirect(301,"/page/admin/home")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error modifying user details." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Extract user ID from request
    const { userId } = req.body;

    // Delete user account
    const user = await User.findByIdAndDelete(userId);
    if(user.profileImage) {
      await deleteImage(req,res,user.profileImage)
    }
    res.redirect(301,"/page/admin/home")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user account." });
  }
};
