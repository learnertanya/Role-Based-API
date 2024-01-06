const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

exports.userSignup = async (req, res) => {
  try {
    // Extract user data from request
    const { email, phone, name, password } = req.body;
    console.log(req.file)

    // Check if at least one of email or phone is provided
    if (!email && !phone) {
      return res
        .status(400)
        .json({ message: "Provide at least email or phone number." });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await User.create({
      email,
      phone,
      name,
      profileImage: req.file.filename,
      password: hashedPassword,
    });
    const isUserSignedUp = true
    res.render('userLogin',{isUserSignedUp})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during user signup." });
  }
};

exports.userLogin = async (req, res) => {
  try {
 
    // Extract login data from request
    const { email, phone, password } = req.body;

    // Check if at least one of email or phone is provided
    if (!email && !phone) {
      return res
        .status(400)
        .json({ message: "Provide at least email or phone number." });
    }

    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate and send JWT token
    const token = jwt.sign({ userId: user._id }, "userSecretKey", {
      expiresIn: "1h",
    });
    res.cookie("jwt",token, {httpOnly : true})
    res.render("userHome",{user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during user login." });
  }
};

exports.adminSignup = async (req, res) => {
  try {
    // Extract admin data from request
    const { email, name, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    // Encrypt admin password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin in the database
    const admin = await Admin.create({
      email,
      name,
      password: hashedPassword,
    });
    
    const isAdminSignedUp = true
    res.render("adminLogin",{isAdminSignedUp})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during admin signup." });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    // Extract login data from request
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate and send JWT token
    const token = jwt.sign({ adminId: admin._id }, "adminSecretKey", {
      expiresIn: "1h",
    });
    res.cookie("jwt",token, {httpOnly : true})
    return res.redirect(301,"/page/admin/home")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during admin login." });
  }
};
