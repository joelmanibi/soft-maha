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
  
  app.post("/api/v1/create-mag", controller.CreateMagasin);
  app.post("/api/v1/add-magasinier",controller.CreateMagasinier);
  app.get("/api/v1/get-all-magasinier",controller.getAllMagasinier);
  app.get("/api/v1/get-all-mag",controller.getAllMagasin);
  app.get("/api/v1/get-all-etagetype",controller.getAllEtagerOrLocalType);
  app.get("/api/v1/get-all-casiertype",controller.getAllCasierOrEmplType);
  app.get("/api/v1/get-all-etager",controller.getAllEtager);
  app.get("/api/v1/get-all-casier",controller.getAllCasier);
  app.get("/api/v1/get-one-mag/:id",[authJwt.verifyToken],controller.getOneMag);
  app.post("/api/v1/update-magasinier",[authJwt.verifySudoToken], controller.UpdateMagasinier);
  app.post("/api/v1/create-etager", controller.CreateEtOrLocal);
  app.post("/api/v1/create-casier", controller.CreateEmplOrCasier);
  app.get("/api/v1/get-stock-by-mag",[authJwt.verifyToken],controller.getAllArticleByMag);
  app.get("/api/v1/get-article", controller.getAllArticle);
  app.get("/api/v1/get-stock", controller.getAllStock);
  app.post("/api/v1/add-article-to-casier", controller.AddArticleToCasier);
  app.post("/api/v1/create-article", controller.CreateArticle);
  app.post("/api/v1/update-article-locate",[authJwt.verifySudoToken], controller.ChangeArticleEmpl);
  app.post("/api/v1/create-usine", controller.CreateUsine);
  app.get("/api/v1/get-usine",[authJwt.verifyToken], controller.GetUsine);


  app.post("/api/v1/add-new-chiefOT",controller.AddResponTravaux);
  app.post("/api/v1/add-new-other", controller.CreateNewOther);
};