const db = require("../models");
const Company = db.company;
const CompanyAdmin = db.company_admin;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.CreateCompany = (req,res) => {
  Company.create({
    company_acronym: req.body.company_acronym,
    company_name: req.body.company_name
      },
    ).then(compagnie => {
          res.send({ message: "New Company was registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.updateCompInfo = (req,res ) => {
  Company.update(
    {
      company_acronym: req.body.company_acronym,
      company_name: req.body.company_name
    },
    {
      where: { company_id: req.body.company_id },
    }
    ).then(company => {
      res.status(200).json({
        active_message: "Mise a jours compagnie effectué avec succes",
        statutcode: 1
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });

}

exports.getAllCompany = (req, res) => {
  Company.findAll()
    .then(company => {
      if (!company){
        return res.status(404).send({ message: "Aucune compagnie trouvé" });
      }
      res.status(200).json({company});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.AddAdminCompany = (req,res) => {
  CompanyAdmin.create({
    userUserId: req.body.user_id,
    companieCompanyId: req.body.company_id
      },
    ).then(company_admin => {
          res.send({ message: "New User Was added to Company admin successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.UpdateAdminCompany = (req,res) => {
  CompanyAdmin.update({
    userUserId: req.body.user_id,
      },
      {
        where: { companieCompanyId: req.body.company_id },
      }
    ).then(company_admin => {
          res.send({ 
            message: "New User Was added to Company admin successfully!",
            statutcode: 1 });
      })
      .catch(err => {
        res.status(500).send({ 
          message: err.message ,
          statutcode: 1 });
      });
};

