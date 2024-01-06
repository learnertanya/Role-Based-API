const renderRoutes = (app) => {
  app.get("/page/admin/login", (req, res) => {
    const isAdminSignedUp = false;
    res.render("adminLogin", { isAdminSignedUp });
  });
};

module.exports = renderRoutes;
