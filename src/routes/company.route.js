const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/company.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/v1/create-company",[authJwt.verifySudoToken], controller.CreateCompany);
  app.post("/api/v1/add-admin-company",[authJwt.verifySudoToken], controller.AddAdminCompany);
  app.post("/api/v1/update-company-info",[authJwt.verifySudoToken],controller.updateCompInfo);
  app.get("/api/v1/get-all-company",[authJwt.verifySudoToken],controller.getAllCompany);
  app.post("/api/v1/update-company-admin",[authJwt.verifySudoToken],controller.UpdateAdminCompany);

};