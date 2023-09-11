const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/v1/get-all-ate",
    controller.getAllAte
  );
  app.get(
    "/api/v1/get-all-user",
    controller.getAllUser
  );
  //
  app.get("/api/v1/get-admin-role",controller.getAdminRole);
  app.get("/api/v1/get-other-role",controller.getOtherUserRole);
  app.get("/api/v1/get-ot-type",controller.getOt_type);
  
};