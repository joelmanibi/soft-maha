const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/da.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/v1/create-da",[authJwt.verifyToken], controller.CreateDa);
  app.get("/api/v1/get-my-da",[authJwt.verifyToken], controller.getallMyDaCreated);
  app.get("/api/v1/get-myclose-da",[authJwt.verifyToken], controller.getallMyCloseDa);
  app.get("/api/v1/get-valn1-da" ,[authJwt.verifyToken], controller.getallMyDaN1val);
  app.post("/api/v1/valn1-da",[authJwt.verifyToken],controller.ValidationN1);
  app.get("/api/v1/get-valn2-da",[authJwt.verifyToken], controller.getallMyDaN2val);
  app.get("/api/v1/get-mag-da",[authJwt.verifyToken], controller.getallMagDA);
  app.get("/api/v1/get-close-mag-da",[authJwt.verifyToken], controller.getallMagDAClose);
  app.post("/api/v1/valn2-da",[authJwt.verifyToken], controller.ValidationN2);
  app.get("/api/v1/verify-da/:code", controller.VerifyDA);
  app.post("/api/v1/retrait-da",[authJwt.verifyToken], controller.ConfirmationRetrait);
};