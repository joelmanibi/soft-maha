const db = require("../models");
const User = db.user;
const MachineGroup = db.machine_group;
const Machine = db.machine;
const Machine_usine = db.machine_usine;
const Machine_piece = db.machine_piece;
const Article = db.article;
const Usine = db.usine;
const { Op } = require("sequelize");

exports.CreateMachineGroupe = (req, res) => {
  MachineGroup.create({
    machine_group_name : req.body.machine_group_name
    }).then(m_group => {
      res.status(200).json({message:"Vous venez de cree le "+req.body.machine_group_name+" comme un groupe de machine"});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.UpdateMachineGroupe = (req, res) => {
  MachineGroup.update({
    machine_group_name : req.body.machine_group_name
    },
    {
      where:{machine_group_id:req.body.machine_group_id}
    }).then(m_group => {
      res.status(200).json({message:"Vous venez de modifier le nom du groupe de machine en "+req.body.machine_group_name});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.DeleteMachineGroupe = (req, res) => {
  MachineGroup.destroy(
    {
      where:{machine_group_id:req.body.machine_group_id}
    }).then(m_group => {
      res.status(200).json({message:"Vous venez de supprimer le nom du groupe de machine"});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.ListMachineGroupe = (req, res) => {
  MachineGroup.findAll({}).then(m_group => {
      res.status(200).json({m_group});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.CreateMachine = (req, res) => {
  Machine.create({
    machine_name : req.body.machine_name,
    machine_groupId : req.body.machine_groupId,
    machine_description : req.body.machine_description,
    dateInstallation : req.body.dateInstallation

    }).then(machine => {
      res.status(200).json({message:"Vous venez de cree le "+req.body.machine_name+" comme une machine"});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.UpdateMachine = (req, res) => {
  Machine.update({
    machine_name : req.body.machine_name,
    machine_groupId : req.body.machine_groupId,
    machine_description : req.body.machine_description,
    dateInstallation : req.body.dateInstallation
    },
    {
      where:{machine_id:req.body.machine_id}
    }
    ).then(machine => {
      res.status(200).json({message:"mise a jour avec succes"});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.DeleteMachine = (req, res) => {
  Machine.destroy(
    {
      where:{machine_id:req.body.machine_id}
    }
    ).then(machine => {
      res.status(200).json({message:"machine supprimé avec succes"});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.ListMachine = (req, res) => {
  Machine.findAll({
    include:[
      {
        model:MachineGroup
      }
    ]
  }).then(machine => {
      res.status(200).json({machine});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.AddMachineToUsine = (req, res) => {
  const machineListe = req.body.machineListe

  for (const machineid of machineListe) {
    Machine_usine.create({
      machineMachineId:machineid,
      usineUsineId : req.body.usineUsineId
    })
  }
  res.status(200).json({message:"machine ajouté avec succes"});
  };

exports.ListMachineUsine = (req, res) => {
  Machine_usine.findAll({
    include:[
      {
        model:Machine
      },
      {
        model:Usine,
        where : {
          usine_id: req.body.usine_id,
        },
      }
    ]
  }).then(machine_usine => {
      res.status(200).json({machine_usine});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.AddOnePieceToMachine = (req, res) => {
    Article.create({
      article_code: req.body.article_code,
      article_name: req.body.article_name,
      article_construct_ref: req.body.article_construct_ref,
      article_cost : req.body.article_cost,
      },
      ).then(article => {
        Machine_piece.create({
          articleArticleId:article.article_id,
          machineMachineId : req.body.machineMachineId
        }).then(piece => {
                  res.send({ message: req.body.article_name + " ajouté avec succes" });
              })
              .catch(err => {
                  res.status(500).send({ message: err.message });
              });
          })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
  
    };

  exports.AddPieceToMachine = (req, res) => {
    const pieceListe = req.body.pieceListe
  
    for (const pieceid of machineListe) {
      Machine_piece.create({
        articleArticleId:pieceid,
        machineMachineId : req.body.machineMachineId
      })
    }
    res.status(200).json({message:"piece ajouté avec succes a la machine"});
    };

exports.ListMachinePiece = (req, res) => {
  Machine_piece.findAll({
    include:[
      {
        model:Machine,
        where:{
          machine_id:req.body.machine_id
        }
      },
      {
        model:Article
      }
    ]
  }).then(machine_piece => {
      res.status(200).json({machine_piece});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.ListMachine = (req, res) => {
    Machine.findAll({}).then(machine => {
        res.status(200).json({machine});
        }).catch(err => {
          res.status(500).send({ message: err.message });
        });
    };