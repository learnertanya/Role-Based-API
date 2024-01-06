const path = require('path')

const renderRoutes = (app) => {
    app.get("/page/:profileImage", (req, res) => {
      const filename = req.params.profileImage
      res.sendFile(path.resolve(__dirname,'..','uploads',filename))
    });
  };
module.exports = renderRoutes;
  