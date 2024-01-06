const renderRoutes = (app) => {
  app.get("/page/user/signup", (req, res) => {
    res.render("userSignup");
  });
};

module.exports = renderRoutes;
