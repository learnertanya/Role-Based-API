const renderRoutes = (app) => {
  app.get("/page/user/login", (req, res) => {
    const isUserSignedUp = false;
    res.render("userLogin", { isUserSignedUp });
  });
};

module.exports = renderRoutes;

