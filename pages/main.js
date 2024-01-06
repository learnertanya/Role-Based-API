const roleAuth  = require("../middlewares/roleMiddleware.js")
const renderRoutes = (app) => {
  app.get("/", async (req, res, next) => {
    try {
      if(req.cookies.jwt) {
        return next()
      }
      res.render("index")
    }catch(err) {
      console.log(err)
      res.status(500).json({message: "Internal Server Error"})
    }
  },roleAuth);
};

module.exports = renderRoutes;
