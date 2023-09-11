const db = require("../models");
const User = db.user;
const Site = db.site;
const Company = db.company;
const SiteAdmin = db.site_admin;


exports.CreateSite = (req,res) => {
  Site.create({
    site_name: req.body.site_name,
    site_company_id: req.body.site_company_id
      },
    ).then(site => {
          res.send({ message: "New Site was registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getAllSite = (req, res) => {
  Site.findAll({
    include: Company
  })
    .then(site => {
      if (!site){
        return res.status(404).send({ message: "Aucun site trouvé" });
      }
      res.status(200).json({site});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateSiteInfo = (req,res ) => {
  Site.update(
    {
      site_name: req.body.site_name,
    },
    {
      where: { site_id: req.body.site_id },
    }
  ).then(site => {
    res.status(200).json({
      message: "Mise a jours site effectué avec succes",
      statutcode: 1
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.getOneSite = (req, res) => {
  Site.findOne({
    where:{site_id : req.params.site_id}
  },
  {
    include: User
  }
  )
    .then(site => {
      if (!site){
        return res.status(404).send({ message: "Aucun site trouvé" });
      }
      res.status(200).json({site});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.AddAdminSite = (req,res) => {
  SiteAdmin.create({
    userUserId: req.body.user_id,
    siteSiteId: req.body.siteSiteId
      },
    ).then(site_admin => {
          res.send({ message: "New User Was added to Site admin successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.UpdateAdminSite = (req,res) => {
  SiteAdmin.update({
    siteSiteId: req.body.site_id
      },
      {
        where: { userUserId: req.body.user_id, },
      }
    ).then(site_admin => {
          res.send({ 
            message: "New User Was added to Site admin successfully!",
            statutcode: 1 });
      })
      .catch(err => {
        res.status(500).send({ 
          message: err.message ,
          statutcode: 1 });
      });
};