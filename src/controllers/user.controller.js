const db = require("../models");
const User = db.user;
const UserType = db.user_type;

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