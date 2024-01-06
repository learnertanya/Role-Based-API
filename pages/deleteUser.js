const renderRoutes = (app) => {
    app.get("/page/user/delete", (req, res) => {
      res.render("userDelete");
    });
  };
  
module.exports = renderRoutes;
  