const { user, stock } = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
const { format } = require('date-fns');
const MyConfig = require("./fonction/codegeneratorfile")
const Di = db.di;
const DiIssue = db.di_issue;
const DiEtat = db.di_etat;
const diPriority = db.di_priority;
const DiType = db.di_type;
const Usine = db.usine;

exports.CreateDi = (req,res) => {
    var code = MyConfig.CodeGenerator()
    const appointment = new Date();
    var date = appointment.setDate(appointment.getDate() + 1); 
    var year = new Date(date).getUTCFullYear();
    var year = year.toString();
    var year = year.substr(2, 2);
    var Month = new Date(date).getMonth() +1;
    var Month = Month.toString();
    var userID = req.user_id;
    var articleID = req.body.di_machine;
    var magID = req.body.di_usineId;
    var Day = new Date(date).getUTCDate() - 1;
    var DIcode = "DI-"+year+Month+Day+code+userID+articleID+magID;
    //console.log(DAcode);
    Di.create({
        di_code : DIcode,
        di_typeId : req.body.di_typeId,
        di_priorityId : req.body.di_priorityId,
        di_machine : req.body.di_machine,
        detectedBy : req.user_id,
        di_etatId : 1,
        di_usineId : req.body.di_usineId,
        di_issueDetected : req.body.di_issueDetected,
        di_commentaire : req.body.di_commentaire
    }).then(di => {
       res.send({ message: "New DI was registered successfully!",statutcode: 1 });
    })
    .catch(err => {
      res.status(500).send({ message: err.message,statutcode: 0 });
    });
};


exports.GetAllDI = (req,res) => {

  Di.findAll({
    include : [
      {
        model:DiIssue,
      },
      {
        model:DiEtat,
      },
      {
        model:diPriority,
      },
      {
        model:DiType,
      },
      {
        model:Usine,
      },
    ]
  })
    .then(di => {
      if (!di){
        return res.status(404).send({ message: "Aucune Di trouvé" });
      }
      res.status(200).json({di});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.UpdateDi = (req,res) => {
  const currentDateTime = new Date();
  const Update_date = format(currentDateTime, 'yyyy-MM-dd HH:mm:ss');
  if(req.body.di_etatId == 2){

    Di.update({
      di_etatId : 2
  }).then(di => {
     res.send({ message: "DI en cours d'execution",statutcode: 1 });
  })
  .catch(err => {
    res.status(500).send({ message: err.message,statutcode: 0 });
  })
  }else if(req.body.di_etatId == 3){

    Di.update({
      di_etatId : 3,
      closedAt : Update_date
  }).then(di => {
     res.send({ message: "Clos",statutcode: 1 });
  })
  .catch(err => {
    res.status(500).send({ message: err.message,statutcode: 0 });
  })

  }else if(req.body.di_etatId==4){
    Di.update({
      di_etatId : 3,
      di_cancelRaison:req.body.di_cancelRaison,
      closedAt : Update_date
  }).then(di => {
     res.send({ message: "Annulé",statutcode: 1 });
  })
  .catch(err => {
    res.status(500).send({ message: err.message,statutcode: 0 });
  })

  };
  
};


exports.GeTypeDi = (req,res) =>{
  DiType.findAll({
  })
    .then(ditype => {
      if (!ditype){
        return res.status(404).send({ message: "Aucune Type trouvé" });
      }
      res.status(200).json({ditype});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.GeTdiPriority = (req,res) =>{
  diPriority.findAll({
  })
    .then(priority => {
      if (!priority){
        return res.status(404).send({ message: "Aucune priorité trouvé" });
      }
      res.status(200).json({priority});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.GeTdiIssue = (req,res) =>{
  DiIssue.findAll({
  })
    .then(issue => {
      if (!issue){
        return res.status(404).send({ message: "Aucune priorité trouvé" });
      }
      res.status(200).json({issue});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}
