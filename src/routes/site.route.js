const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/site.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/v1/create-site", controller.CreateSite);
  app.post("/api/v1/add-admin-site",[authJwt.verifySudoToken], controller.AddAdminSite);
  app.get("/api/v1/get-all-site",controller.getAllSite);
  app.get("/api/v1/get-one-site/:id",[authJwt.verifyToken],controller.getOneSite);
  app.post("/api/v1/update-admin-site",[authJwt.verifySudoToken], controller.UpdateAdminSite);
  app.post("/api/v1/update-site-info",[authJwt.verifySudoToken],controller.updateSiteInfo);
};