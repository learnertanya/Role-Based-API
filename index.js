// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

const mainPage = require("./pages/main.js")

const userSignupPage = require("./pages/signupUser.js")
const userLoginPage=require("./pages/loginUser.js")
const userHomePage = require("./pages/homeUser.js")
const userDeletePage = require("./pages/deleteUser.js")

const adminLoginPage=require("./pages/loginAdmin.js")
const adminSignupPage = require("./pages/signupAdmin.js")
const adminHomePage = require("./pages/homeAdmin.js")

const profileImagePage = require("./pages/profileImage.js")

dotenv.config();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// Render the landing page on the root URL
mainPage(app)

// Render the user signup form
userSignupPage(app);

// Render the user login form
userLoginPage(app);

//Render the user home page
userHomePage(app);

//Render the user Delete page
userDeletePage(app);

//Render the admin signup here
adminSignupPage(app);

// Render the user login form
adminLoginPage(app);

//Render the admin home page
adminHomePage(app);

//Render profile image
profileImagePage(app);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


