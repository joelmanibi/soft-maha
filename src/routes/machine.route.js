const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/machine.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/v1/create-machine-group",controller.CreateMachineGroupe);
  app.post("/api/v1/update-machine-group",controller.UpdateMachineGroupe);
  app.post("/api/v1/delete-machine-group",controller.DeleteMachineGroupe);
  app.get("/api/v1/all-machine-group",controller.ListMachineGroupe);
  app.get("/api/v1/all-machine",[authJwt.verifyToken],controller.ListMachine);

  app.post("/api/v1/create-machine",controller.CreateMachine);
  app.post("/api/v1/update-machine",controller.UpdateMachine);
  app.post("/api/v1/delete-machine",controller.DeleteMachine);
  app.get("/api/v1/all-machine",controller.ListMachine);

  app.post("/api/v1/create-machine-usine",controller.AddMachineToUsine);
  app.get("/api/v1/all-machine-usine",controller.ListMachineUsine);
  app.post("/api/v1/create-machine-piece",controller.AddPieceToMachine);
  app.post("/api/v1/create-machine-one-piece",controller.AddOnePieceToMachine)
  app.get("/api/v1/all-machine-piece",controller.ListMachinePiece);
};