const db = require("../models");
const User = db.user;
const Magasin = db.magasin;
const Magasinier = db.magasinier;
const EtagerOrLocal = db.etagerorlocal;
const CasierOrEmpl = db.casierorempl;
const Article = db.article;
const Stock = db.stock;
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

exports.getAllMagasin = (req, res) => {
    Magasin.findAll()
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
    User.create({
        user_matricule: req.body.user_matricule,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_phone: req.body.user_phone,
        user_role: 9,
        user_isActive: 1,
        user_password: bcrypt.hashSync("0000", 8)
      })
        .then(user => {
          Magasinier.create({
            userUserId: user.user_id,
            magasinMagasinId: req.body.magasinMagasinId
              },
            ).then(magasinier => {
                  res.send({ message: "New Magasinier Was added to Site admin successfully!" });
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  };

  exports.CreateMagasinier = (req,res) => {
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
            statutcode: 1 });
        });
    };

exports.CreateEtOrLocal = (req,res) => {
    EtagerOrLocal.create({
        etagerorlocal_name: req.body.etagerorlocal_name,
        etagerorlocal_type_id: req.body.etagerorlocal_type_id,
        etagerorlocal_magasin_id: req.body.etagerorlocal_magasin_id
        },
        ).then(etagerorlocal => {
            res.send({ message: "New Etager or Local Was added to Site admin successfully!" });
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
            res.send({ message: "New Casier or Emplacement Was added to Site admin successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
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
      where: { userUserId: 7},
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

exports.CreateNewCU = (req,res) => {
    User.create({
        user_matricule: req.body.user_matricule,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_phone: req.body.user_phone,
        user_role: 4,
        user_isActive: 1,
        user_password: bcrypt.hashSync("0000", 8)
      })
        .then(user => {
          Cu.create(
            {
                userUserId: user.user_id,
                usineUsineId : req.body.usineUsineId
            }
          );
          res.status(200).json({
            message: "New Chef d'usine Was added successfully!",
            statutcode: 1
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.AddCU = (req,res) => {
    User.Update({
        user_role: 4
      },
      {
        where:{user_id:req.body.user_id}
      }).then(user => {
        Cu.Update({
            userUserId: req.body.user_id
          },
          {
            where :{usineUsineId : req.body.usineUsineId}
          }
          )
          res.status(200).json({
            message: "New Chef d'usine Was added successfully!",
            statutcode: 1
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.AddATE = (req,res) => {
    User.Update({
        user_role: 5
      },
      {
        where:{user_id:req.body.user_id}
      }).then(user => {
        Ate.Update({
            userUserId: req.body.user_id
          },
          {
            where :{usineUsineId : req.body.usineUsineId}
          }
          )
          res.status(200).json({
            message: "New ATE Was added successfully!",
            statutcode: 1
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.CreateNewATE = (req,res) => {
    User.create({
        user_matricule: req.body.user_matricule,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_phone: req.body.user_phone,
        user_role: 5,
        user_isActive: 1,
        user_password: bcrypt.hashSync("0000", 8)
      })
        .then(user => {
          Ate.create(
            {
                userUserId: user.user_id,
                usineUsineId : req.body.usineUsineId
            }
          );
          res.status(200).json({
            message: "New ATE Was added successfully!",
            statutcode: 1
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.AddCEM = (req,res) => {
  User.Update({
      user_role: 6
    },
    {
      where:{user_id:req.body.user_id}
    }).then(user => {
      Cem.Update({
          userUserId: req.body.user_id
        },
        {
          where :{usineUsineId : req.body.usineUsineId}
        }
        )
        res.status(200).json({
          message: "New Cem Was added successfully!",
          statutcode: 1
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.CreateNewCEM = (req,res) => {
  User.create({
      user_matricule: req.body.user_matricule,
      user_firstname: req.body.user_firstname,
      user_lastname: req.body.user_lastname,
      user_phone: req.body.user_phone,
      user_role: 6,
      user_isActive: 1,
      user_password: bcrypt.hashSync("0000", 8)
    })
      .then(user => {
        Cem.create(
          {
              userUserId: user.user_id,
              usineUsineId : req.body.usineUsineId
          }
        );
        res.status(200).json({
          message: "New CEM Was added successfully!",
          statutcode: 1
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.AddCEE = (req,res) => {
  User.Update({
      user_role: 7
    },
    {
      where:{user_id:req.body.user_id}
    }).then(user => {
      Cem.Update({
          userUserId: req.body.user_id
        },
        {
          where :{usineUsineId : req.body.usineUsineId}
        }
        )
        res.status(200).json({
          message: "New CEE Was added successfully!",
          statutcode: 1
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.CreateNewCEE = (req,res) => {
  User.create({
      user_matricule: req.body.user_matricule,
      user_firstname: req.body.user_firstname,
      user_lastname: req.body.user_lastname,
      user_phone: req.body.user_phone,
      user_role: 7,
      user_isActive: 1,
      user_password: bcrypt.hashSync("0000", 8)
    })
      .then(user => {
        Cee.create(
          {
              userUserId: user.user_id,
              usineUsineId : req.body.usineUsineId
          }
        );
        res.status(200).json({
          message: "New CEE Was added successfully!",
          statutcode: 1
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.AddCQ = (req,res) => {
  User.Update({
      user_role: 8
    },
    {
      where:{user_id:req.body.user_id}
    }).then(user => {
      Cem.Update({
          userUserId: req.body.user_id
        },
        {
          where :{usineUsineId : req.body.usineUsineId}
        }
        )
        res.status(200).json({
          message: "New CQ Was added successfully!",
          statutcode: 1
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.CreateNewCQ = (req,res) => {
  User.create({
      user_matricule: req.body.user_matricule,
      user_firstname: req.body.user_firstname,
      user_lastname: req.body.user_lastname,
      user_phone: req.body.user_phone,
      user_role: 8,
      user_isActive: 1,
      user_password: bcrypt.hashSync("0000", 8)
    })
      .then(user => {
        Cq.create(
          {
              userUserId: user.user_id,
              usineUsineId : req.body.usineUsineId
          }
        );
        res.status(200).json({
          message: "New CQ Was added successfully!",
          statutcode: 1
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};