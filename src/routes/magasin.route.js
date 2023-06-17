const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/magasin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/v1/create-mag",[authJwt.verifySudoToken], controller.CreateMagasin);
  app.post("/api/v1/add-magasinier",[authJwt.verifySudoToken], controller.CreateMagasinier);
  app.get("/api/v1/get-all-mag",[authJwt.verifyToken],controller.getAllMagasin);
  app.get("/api/v1/get-one-mag/:id",[authJwt.verifyToken],controller.getOneMag);
  app.post("/api/v1/update-magasinier",[authJwt.verifySudoToken], controller.UpdateMagasinier);
  app.post("/api/v1/create-etager",[authJwt.verifySudoToken], controller.CreateEtOrLocal);
  app.post("/api/v1/create-casier",[authJwt.verifySudoToken], controller.CreateEmplOrCasier);
  app.get("/api/v1/get-stock",[authJwt.verifyToken],controller.getAllArticleByMag);
  app.get("/api/v1/get-article",[authJwt.verifyToken], controller.getAllArticle);
  app.post("/api/v1/create-article",[authJwt.verifySudoToken], controller.CreateArticle);
  app.post("/api/v1/update-article-locate",[authJwt.verifySudoToken], controller.ChangeArticleEmpl);
  app.post("/api/v1/create-usine",[authJwt.verifySudoToken], controller.CreateUsine);
  app.post("/api/v1/create-new-cu",[authJwt.verifySudoToken], controller.CreateNewCU);
  app.post("/api/v1/add-new-cu",[authJwt.verifySudoToken], controller.AddCU);
  app.post("/api/v1/create-new-ate",[authJwt.verifySudoToken], controller.CreateNewATE);
  app.post("/api/v1/add-new-ate",[authJwt.verifySudoToken], controller.AddATE);
  app.post("/api/v1/create-new-cem",[authJwt.verifySudoToken], controller.CreateNewCEM);
  app.post("/api/v1/add-new-cem",[authJwt.verifySudoToken], controller.AddCEM);
  app.post("/api/v1/create-new-cee",[authJwt.verifySudoToken], controller.CreateNewCEE);
  app.post("/api/v1/add-new-cee",[authJwt.verifySudoToken], controller.AddCEE);
  app.post("/api/v1/create-new-cq",[authJwt.verifySudoToken], controller.CreateNewCQ);
  app.post("/api/v1/add-new-cq",[authJwt.verifySudoToken], controller.AddCQ);
};