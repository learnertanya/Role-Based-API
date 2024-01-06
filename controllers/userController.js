// controllers/userController.js
const User = require("../models/User");
const deleteImage = require("../utils/deleteImage")

exports.modifyUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const { name } = req.body;
    if (name) {
      user.name = name;
    }
    if (req.file) {
      await deleteImage(req,res,user.profileImage)
      user.profileImage = req.file.filename
    }
    await user.save();
    res.redirect(301,"/page/user/home")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error modifying your details." });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting your details." });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByIdAndDelete(userId);
    if(user.profileImage) {
      await deleteImage(req,res,user.profileImage)
    }
    res.clearCookie('jwt')
    res.redirect(301,"/page/user/delete")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user account" });
  }
};


exports.logoutUser = async(req,res) => {
  try {
    res.clearCookie('jwt');
    return res.redirect(301,"/")
  }catch(err) {
    console.error(err);
    res.status(500).json({message : "Error logging out"})
  }
}