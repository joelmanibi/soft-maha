const db = require("../models");
const User = db.user;
const Magasin = db.magasin;
const Magasinier = db.magasinier;
const EtagerOrLocal = db.etagerorlocal;
const EtagerOrLocalType = db.etagerorlocal_type;
const CasierOrEmplType = db.casierorempl_type;
const CasierOrEmpl = db.casierorempl;
const Article = db.article;
const OtChiefOp = db.ot_chiefop;
const UserType = db.user_type;
const Stock = db.stock;
const Site = db.site;
const Usine = db.usine;
const Cu = db.cu;
const Ate = db.ate;
const Cem = db.cem;
const Cee = db.cee;
const Cq = db.cq;
var bcrypt = require("bcryptjs");

exports.CreateMagasin = (req,res) => {
    Magasin.create({
        magasin_code : req.body.magasin_code,
        magasin_site_id : req.body.magasin_site_id,
    }).then(magasin => {
        res.send({ message: "New Magasin was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllEtagerOrLocalType = (req, res) => {
  EtagerOrLocalType.findAll({
    })
      .then(etagetype => {
        if (!etagetype){
          return res.status(404).send({ message: "Aucun type trouvé" });
        }
        res.status(200).json({etagetype});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.getAllCasierOrEmplType = (req, res) => {
    CasierOrEmplType.findAll({
      })
        .then(casiertype => {
          if (!casiertype){
            return res.status(404).send({ message: "Aucun type trouvé" });
          }
          res.status(200).json({casiertype});
        }).catch(err => {
          res.status(500).send({ message: err.message });
        });
    };

  exports.getAllEtager = (req, res) => {
    EtagerOrLocal.findAll({
      include:[
        {
          model: EtagerOrLocalType
        },
        {
          model: Magasin
        }
      ]
      })
        .then(etage => {
          if (!etage){
            return res.status(404).send({ message: "Aucun type trouvé" });
          }
          res.status(200).json({etage});
        }).catch(err => {
          res.status(500).send({ message: err.message });
        });
    };

  exports.getAllCasier = (req, res) => {
    CasierOrEmpl.findAll({
      include:[
        {
          model: EtagerOrLocal,
          include:[
            {
              model:Magasin
            }
          ]
        },
        {
          model: CasierOrEmplType
        }
      ]
      })
        .then(casier => {
          if (!casier){
            return res.status(404).send({ message: "Aucun type trouvé" });
          }
          res.status(200).json({casier});
        }).catch(err => {
          res.status(500).send({ message: err.message });
        });
    };

    exports.getAllMagasinier = (req, res) => {
      Magasinier.findAll({
        //// verfier pourquoi user n'est pas associer a magasinier
        include:[
          {
            model:User,
            include:[
              {
                model:UserType
              }
            ]
          },
          {
            model:Magasin,
            include:[
              {
                model:Site
              }
            ]
          }
        ]
      }).then(magasinier => {
          if (!magasinier){
            return res.status(404).send({ message: "Aucun magasinier trouvé" });
          }
          res.status(200).json({magasinier});
        }).catch(err => {
          res.status(500).send({ message: err.message });
        });
    };

exports.getAllMagasin = (req, res) => {
    Magasin.findAll({
      include:[
        {
          model:Site
        }
      ]
    })
      .then(magasin => {
        if (!magasin){
          return res.status(404).send({ message: "Aucun magasin trouvé" });
        }
        res.status(200).json({magasin});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.updateMagInfo = (req,res ) => {
    Magasin.update(
      {
        magasin_code: req.body.magasin_code,
      },
      {
        where: { magasin_id: req.body.magasin_id },
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

  exports.getOneMag = (req, res) => {
    Magasin.findOne({
      where:{magasin_id : req.params.id}
    }
    )
      .then(magasin => {
        if (!magasin){
          return res.status(404).send({ message: "Aucun site trouvé" });
        }
        res.status(200).json({magasin});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.CreateMagasinier = (req,res) => {
    //CreateMagasinier
    User.create({
        user_matricule: req.body.user_matricule,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_phone: req.body.user_phone,
        user_role: 9,
        user_isActive:req.body.user_isActive,
        user_password: bcrypt.hashSync("0000", 8)
      })
        .then(user => {
          Magasinier.create({
            userUserId: user.user_id,
            magasinMagasinId: req.body.magasinMagasinId
              },
            ).then(magasinier => {
                  res.send({ message: "Vous venez d'\enregistrer le Magasinier "+req.body.user_matricule });
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  };

  exports.AddMagasinier = (req,res) => {
    Magasinier.create({
      userUserId: req.body.user_id,
      magasinMagasinId: req.body.magasinMagasinId
        },
      ).then(magasinier => {
            res.send({ message: "New Magasinier Was added to Site admin successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  };

  exports.UpdateMagasinier = (req,res) => {
    Magasinier.update({
      magasinMagasinId: req.body.magasin_id
        },
        {
          where: { userUserId: req.body.user_id },
        }
      ).then(magasinier => {
            res.send({ 
              message: "New User Was updated to Magasin admin successfully!",
              statutcode: 1 });
        })
        .catch(err => {
          res.status(500).send({ 
            message: err.message ,
            statutcode: 0 });
        });
    };

exports.CreateEtOrLocal = (req,res) => {
    EtagerOrLocal.create({
        etagerorlocal_name: req.body.etagerorlocal_name,
        etagerorlocal_type_id: req.body.etagerorlocal_type_id,
        etagerorlocal_magasin_id: req.body.etagerorlocal_magasin_id
        },
        ).then(etagerorlocal => {
            res.send({ message: req.body.etagerorlocal_name + "Ajouté avec succes" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    };

exports.CreateEmplOrCasier = (req,res) => {
    CasierOrEmpl.create({
        casierorempl_name: req.body.casierorempl_name,
        casierorempl_type_id: req.body.casierorempl_type_id,
        casierorempl_locate_id: req.body.casierorempl_locate_id
        },
        ).then(casierorempl => {
            res.send({ message: req.body.casierorempl_name + "Ajouté avec succes" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.AddArticleToCasier = (req,res) => {
  Stock.findOne({
    where: {
      casieroremplCasieroremplId : req.body.casierId
    }
  }).then(stock => {
    if (stock) {
      res.status(400).send({
        message: "Casier ou Emplacement deja utilisé"
      });
      return;
    }
    Stock.create({
      articleArticleId :req.body.article_id,
      stock_quantity: req.body.stock_quantity,
      stock_seuil: req.body.stock_seuil,
      casieroremplCasieroremplId : req.body.casierId,
      stock_locate_id:req.body.stock_locate_id 
      },
      ).then(stock => {
          res.send({ message: "Stock Ajouter avec succes" });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
  });
  
};

exports.CreateArticle = (req,res) => {
    Article.create({
        article_code: req.body.article_code,
        article_name: req.body.article_name,
        article_construct_ref: req.body.article_construct_ref,
        article_cost : req.body.article_cost,
        },
        ).then(article => {
            Stock.create({
                articleArticleId :article.article_id,
                stock_quantity: req.body.stock_quantity,
                casieroremplCasieroremplId : req.body.casierId
                },
                ).then(stock => {
                    res.send({ message: "New Article Was added  successfully!" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
            })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllStock = (req, res) => {
  Stock.findAll({
    include:[
      {
        model:Magasin
      },
      {
        model:Article
      },
      {
        model:CasierOrEmpl,
        include:[
          {
            model: CasierOrEmplType
          }
        ]
      }
    ]
  })
    .then(stock => {
      if (!stock){
        return res.status(404).send({ message: "Aucun stock trouvé" });
      }
      res.status(200).json({stock});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllArticle = (req, res) => {
  Article.findAll()
    .then(article => {
      if (!article){
        return res.status(404).send({ message: "Aucun site trouvé" });
      }
      res.status(200).json({article});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.getAllArticleByMag = (req, res) => {
  Cq.findOne(
    {
      where: { userUserId: req.user_id},
    }
  )
    .then(cq => {
      Usine.findOne({
        where: {usine_id:cq.usineUsineId}
      }).then(usine => {
        Magasin.findOne({
          where : {magasin_id:usine.usine_magasin_id}
        }).then(magasin => {
          Stock.findAll({
            where :{
              stock_locate_id:magasin.magasin_id
            },
            include : [
              {
                  model:Article,
                  //as: "articleArticleId"
              },
              
            ]
          }).then(stock => {
            res.status(200).send({ stock});
          }
            
            )
        })
      })
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.ChangeArticleEmpl = (req,res) => {
    Stock.update({
        casieroremplCasieroremplId : req.body.casierId
        },
        {where:{articleArticleId : req.body.article_id,}}
        ).then(stock => {
            res.send({ message: "New Article Was added to new location successfully!" });
            })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.CreateUsine = (req,res) => {
    Usine.create({
        usine_code: req.body.usine_code,
        usine_name: req.body.usine_name,
        usine_magasin_id: req.body.usine_magasin_id
        },
        ).then(usine => {
            res.send({ message: "New Usine Was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
    });
};

exports.GetUsine = (req,res) => {
  Usine.findAll({
    include : [
      {
          model:Magasin,
          //as: "articleArticleId"
      },
      
    ]
  })
    .then(usine => {
      if (!usine){
        return res.status(404).send({ message: "Aucune Usine trouvé" });
      }
      res.status(200).json({usine});
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.CreateNewOther = (req,res) => {
  User.create({
      user_matricule: req.body.user_matricule,
      user_firstname: req.body.user_firstname,
      user_lastname: req.body.user_lastname,
      user_phone: req.body.user_phone,
      user_role: req.body.user_role,
      user_isActive: req.body.user_isActive,
      user_password: bcrypt.hashSync("0000", 8)
    }).then(user => {
        if(req.body.user_role ==4){
          Cu.create(
            {
                userUserId: user.user_id,
                usineUsineId : req.body.usineUsineId
            }
          );
          res.status(200).json({
            message: "Vous venez d'\enregistrer le Chef d'\ usine "+req.body.user_matricule,
            statutcode: 1
          });
        }else if(req.body.user_role ==5){
            Ate.create({
              userUserId: user.user_id,
              usineUsineId : req.body.usineUsineId
            }
            )
            res.status(200).json({
              message: "Vous venez d'\enregistrer l'\ ATE "+req.body.user_matricule,
              statutcode: 1
            });

        }else if(req.body.user_role ==6){
          Cem.create(
            {
                userUserId: user.user_id,
                usineUsineId : req.body.usineUsineId
            }
          );
          res.status(200).json({
            message: "Vous venez d'\enregistrer le Chef d'\equipe de maintenance "+req.body.user_matricule,
            statutcode: 1
          });
        }else if(req.body.user_role ==7){
          
          
        }else if(req.body.user_role ==8){
          Cq.create(
            {
                userUserId: user.user_id,
                usineUsineId : req.body.usineUsineId
            }
          );
          res.status(200).json({
            message: "Vous venez d'\enregistrer le Chef de quart "+req.body.user_matricule,
            statutcode: 1
          });
        }}).catch(err => {
        res.status(500).send({ message: err.message });
      });
};
exports.AddResponTravaux = (req,res) => {
  User.create({
    user_matricule: req.body.user_matricule,
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_phone: req.body.user_phone,
    user_role: 7,
    user_isActive: req.body.user_isActive,
    user_password: bcrypt.hashSync("0000", 8)
  }).then(user => {
    OtChiefOp.create(
      {
          userUserId: user.user_id,
          usineUsineId : req.body.usineUsineId,
          otTypeOtTypeId :req.body.otTypeOtTypeId 
      } 
    );
    res.status(200).json({
      message: "Vous venez d'\enregistrer Responsable de Travaux "+req.body.user_matricule,
      statutcode: 1
    });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.AddResponTravaux = (req,res) => {
  User.create({
    user_matricule: req.body.user_matricule,
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_phone: req.body.user_phone,
    user_role: 7,
    user_isActive: req.body.user_isActive,
    user_password: bcrypt.hashSync("0000", 8)
  }).then(user => {
    OtChiefOp.create(
      {
          userUserId: user.user_id,
          usineUsineId : req.body.usineUsineId,
          otTypeOtTypeId :req.body.otTypeOtTypeId 
      } 
    );
    res.status(200).json({
      message: "Vous venez d'\enregistrer Responsable de Travaux "+req.body.user_matricule,
      statutcode: 1
    });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};
