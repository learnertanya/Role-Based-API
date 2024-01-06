const renderRoutes = (app) => {
  app.get("/page/admin/signup", (req, res) => {
    res.render("adminSignup");
  });
};
module.exports = renderRoutes;
