const userAuth = require("../middlewares/userMiddleware.js");

const renderRoutes = (app) => {
  app.get("/page/user/home", userAuth, (req, res) => {
    const user = req.user;
    res.render("userHome", { user });
  });
};

module.exports = renderRoutes;
