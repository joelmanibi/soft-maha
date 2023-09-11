const { authJwt } = require("../middleware");
const controller = require("../controllers/di.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/v1/create-di",[authJwt.verifyToken], controller.CreateDi);
  app.post("/api/v1/update-di", controller.UpdateDi);
  app.get("/api/v1/get-di", controller.GetAllDI);
  app.get("/api/v1/get-di-type",[authJwt.verifyToken],controller.GeTypeDi);
  app.get("/api/v1/get-priority",[authJwt.verifyToken],controller.GeTdiPriority);
  app.get("/api/v1/get-issue",[authJwt.verifyToken],controller.GeTdiIssue)
};