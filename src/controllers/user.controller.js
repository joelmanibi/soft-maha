const db = require("../models");
const User = db.user;
const UserType = db.user_type;
const Ot_type = db.ot_type;
const { Op } = require("sequelize");

exports.getAllAte = (req, res) => {
    User.findAll({
        where :{
            user_role:5,
            user_isActive : true
        },
        attributes: {
            exclude: ['user_password','user_token','user_matricule','user_isActive']
        }
    })
      .then(user => {
        if (!user){
          return res.status(404).send({ message: "Aucune ATE trouvé" });
        }
        res.status(200).json({user});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getAdminRole = (req, res) => {
    UserType.findAll({
      where :{
        [Op.or]: [
          { user_type_id:1},
          { user_type_id:2},
          { user_type_id:3},
        ] 
    },
    })
      .then(user_type => {
        if (!user_type){
          return res.status(404).send({ message: "Aucune Role" });
        }
        res.status(200).json({user_type});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getOtherUserRole = (req, res) => {
    UserType.findAll({
      where :{
        [Op.or]: [
          { user_type_id:4},
          { user_type_id:5},
          { user_type_id:6},
          { user_type_id:8}
        ] 
    },
    })
      .then(user_type => {
        if (!user_type){
          return res.status(404).send({ message: "Aucune Role" });
        }
        res.status(200).json({user_type});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
// getOt_type
exports.getOt_type = (req, res) => {
  Ot_type.findAll({
  }).then(ot_type => {
      if (!ot_type){
        return res.status(404).send({ message: "Aucune Role" });
      }
      res.status(200).json({ot_type});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
  exports.getAllUser = (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['user_password','user_token']
        },
        include:[
          {
            model:UserType
          }
        ]
    })
      .then(user => {
        if (!user){
          return res.status(404).send({ message: "Aucune User trouvé" });
        }
        res.status(200).json({user});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };