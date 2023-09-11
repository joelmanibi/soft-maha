const db = require("../models");
const User = db.user;
const { Op } = require("sequelize");
checkDuplicateUser = (req, res, next) => {
  // User number
  User.findOne({
    where: {
      [Op.or]: [
        { user_matricule: req.body.user_matricule },
        { user_phone: req.body.user_phone }
      ]
     
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Matricule ou numero de telephone deja Utilisé"
      });
      return;
    }
    // Email
    //User.findOne({
    //  where: {
    //    user_email: req.body.user_email
   //   }
   // }).then(user => {
    //  if (user) {
      //  res.status(400).send({
      //    message: "Failed! Email is already in use!"
     //   });
     //   return;
     // }
    //  next();
    //});
    next();
  });
};

const verifySignUp = {
    checkDuplicateUser: checkDuplicateUser,
  };
  module.exports = verifySignUp;