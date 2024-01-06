const adminAuth = require("../middlewares/adminMiddleware.js");
const User = require("../models/User"); // Import the User model

const renderRoutes = (app) => {
  app.get("/page/admin/home", adminAuth, async (req, res) => {
    try {
      // Get all user details
      const users = await User.find();

      // Pass the user data to the view
      res.render("adminHome", { users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user details." });
    }
  });
};

module.exports = renderRoutes;
