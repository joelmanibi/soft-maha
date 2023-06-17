const { user, stock } = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
const MyConfig = require("./fonction/codegeneratorfile")
const Da = db.da;
const Article = db.article;
const User = db.user;
const Stock = db.stock;
const EtagerOrLocal = db.etagerorlocal
const CasierOrEmpl = db.casierorempl
const Magasin = db.magasin
const Magasinier =db.magasinier

exports.CreateDa = (req,res) => {
    var code = MyConfig.CodeGenerator()
    const appointment = new Date();
    var date = appointment.setDate(appointment.getDate() + 1); 
    var year = new Date(date).getUTCFullYear();
    var year = year.toString();
    var year = year.substr(2, 2);
    var Month = new Date(date).getMonth() +1;
    var Month = Month.toString();
    var userID = req.user_id;
    var articleID = req.body.da_article_id;
    var magID = req.body.da_magasin_id;
    var Day = new Date(date).getUTCDate() - 1;
    var DAcode = "DA-"+year+Month+Day+code+userID+articleID+magID;
    //console.log(DAcode);
    Da.create({
        da_code : DAcode,
        da_imputation_ana : req.body.da_imputation_ana,
        da_qte_article : req.body.da_qte_article,
        da_article_id : req.body.da_article_id,
        da_demandeur_id : req.user_id,
        da_validn1_id : req.body.da_validn1_id,
        da_magasin_id : req.body.da_magasin_id,
        da_etat_id : 2

    }).then(da => {
       res.send({ message: "New DA was registered successfully!",statutcode: 1 });
    })
    .catch(err => {
      res.status(500).send({ message: err.message,statutcode: 0 });
    });
};

exports.getallMyDaCreated = (req, res) => {
    Da.findAll({
      where:{
        da_demandeur_id : req.user_id,
        da_etat_id:{
          // < 4
          [Op.lte]: 4, 
      }
      },
      order: [
        ['da_id', 'DESC']
    ],
      include : [
        {
            model:Article
        },
        {
            model:User,
            as: "valideurn1"
        },
        {
            model:Magasin,
            as: "magasin"
        }
      ]
    }
    ).then(da => {
        if (!da){
          return res.status(404).send({ message: "Aucun site trouvé" });
        }
        res.status(200).json({da});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.getallMyCloseDa = (req, res) => {
    Da.findAll({
      where:{
        da_demandeur_id : req.user_id,
        da_etat_id:{
            // > 5
            [Op.gte]: 5,
        }
    
    },
    order: [
      ['da_id', 'DESC']
  ],
      include : [
        {
            model:Article
        },
        {
            model:User,
            as: "valideurn1"
        },
        {
            model:Magasin,
            as: "magasin"
        }
      ]
    }
    )
      .then(da => {
        if (!da){
          return res.status(404).send({ message: "Aucun site trouvé" });
        }
        res.status(200).json({da});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getallMyDaN1val = (req, res) => {
    Da.findAll({
      where:{
        da_validn1_id : req.user_id,
    },
    order: [
      ['da_id', 'DESC']
  ],
      include : [
        {
            model:Article
        },
        {
            model:User,
            as: "demandeur"
        },
        {
          model:Magasin,
          as: "magasin"
      }
      ]
    }
    ).then(da => {
        if (!da){
          return res.status(404).send({ message: "Aucun site trouvé" });
        }
        res.status(200).json({da});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.ValidationN1 = (req,res) => {
  const appointment = new Date();
  var date = appointment.setDate(appointment.getDate()); 
  var year = new Date(date)
Da.update({
    da_etat_id: req.body.da_etat_id,
  //  da_validn2_id:req.body.da_validn2_id,
    da_validn1_date : year
    },
    {
        where: { 
          da_code: req.body.da_code,
        },
    }
    ).then(da => {
        res.send({ 
            message: "New DA Was updated successfully!",
            statutcode: 1 });
    })
    .catch(err => {
        res.status(500).send({ 
        message: err.message ,
        statutcode: 0 });
    });
};

    exports.getallMyDaN2val = (req, res) => {
        Da.findAll({
          where:{
            da_validn2_id : req.user_id
        },
          include : [
            {
                model:Article
            },
            {
                model:User,
                as: "valideurn1"
            },
            {
                model:User,
                as: "demandeur"
            }
          ]
        }
        ).then(da => {
            if (!da){
              return res.status(404).send({ message: "Aucun site trouvé" });
            }
            res.status(200).json({da});
          }).catch(err => {
            res.status(500).send({ message: err.message });
          });
      };
      exports.getallMagDA = (req, res) => {
        Magasinier.findOne({
          where:{
            userUserId : req.user_id
        }}
        ).then(mag => {
            if (!mag){
              return res.status(404).send({ message: "Aucun Magasin trouvé" });
            }else{
              Da.findAll({
                where:{
                  da_magasin_id:mag.magasinMagasinId,
                  da_etat_id:{
                    // < 4
                    [Op.lte]: 4,
                }
                },
                order: [
                  ['da_id', 'DESC']
              ],
                include : [
                  {
                      model:Article
                  },
                  {
                      model:User,
                      as: "valideurn1"
                  },
                  {
                      model:User,
                      as: "demandeur"
                  }
                ]
              }).then(da=> {
                res.status(200).json({da});
              })
            }
          }).catch(err => {
            res.status(500).send({ message: err.message });
          });
      };
      exports.getallMagDAClose = (req, res) => {
        Magasinier.findOne({
          where:{
            userUserId : req.user_id
        }}
        ).then(mag => {
            if (!mag){
              return res.status(404).send({ message: "Aucun Magasin trouvé" });
            }else{
              Da.findAll({
                where:{
                  da_magasin_id:mag.magasinMagasinId,
                  da_etat_id:{
                    // < 4
                    [Op.gte]: 5,
                }
                },
                include : [
                  {
                      model:Article
                  },
                  {
                      model:User,
                      as: "valideurn1"
                  },
                  {
                      model:User,
                      as: "demandeur"
                  }
                ]
              }).then(da=> {
                res.status(200).json({da});
              })
            }
          }).catch(err => {
            res.status(500).send({ message: err.message });
          });
      };

exports.ValidationN2 = (req,res) => {
  const appointment = new Date();
  var date = appointment.setDate(appointment.getDate()); 
  var year = new Date(date)
    Da.update({
        da_etat_id: req.body.da_etat_id,
        da_validn2_date : year
        },
        {
            where: { 
            da_code: req.body.da_code,
            },
        }
        ).then(da => {
            res.send({ 
                message: "New DA Was updated by n2 successfully!",
                statutcode: 1 });
        })
        .catch(err => {
            res.status(500).send({ 
            message: err.message ,
            statutcode: 0 });
        });
};

exports.getallMyDaN2val = (req, res) => {
    Da.findAll({
              where:{
                da_validn2_id : req.user_id
            },
              include : [
                {
                    model:Article
                },
                {
                    model:User,
                    as: "valideurn1"
                },
                {
                    model:User,
                    as: "demandeur"
                }
              ]
            }
            ).then(da => {
                if (!da){
                  return res.status(404).send({ message: "Aucun site trouvé" });
                }
                res.status(200).json({da});
              }).catch(err => {
                res.status(500).send({ message: err.message });
              });
        };
exports.VerifyDA = (req, res) => {
    Da.findOne({
        where: {
        da_code: req.params.code
        },
        include : [
            {
                model:Article
            },
            {
                model:User,
                as: "valideurn1"
            },
            {
                model:User,
                as: "valideurn2"
            },
            {
                model:User,
                as: "demandeur"
            }
          ]
    }).then(da=>{
      if (da==null) {
        res.status(404).json({message:"Ceci n'est pas une DA", statutcode: 0});
      }else{
        Stock.findOne({
          where: {
            stock_locate_id : da.da_magasin_id,
            articleArticleId:da.da_article_id
            },
            include:[
              {
                model:CasierOrEmpl,
                //as: "casier"
            },
            {
              model:Article,
              //as: "casier"
          }
            ]
        }).then(stock=>{
          if (da.da_etat_id == 4) {
            return res.status(200).json({
              da_id:da.da_id,
              da_code:da.da_code,
              magasin : da.da_magasin_id,
              casier:stock.casierorempl.casierorempl_name,
              article_name:stock.article.article_name,
              article_id:stock.article.article_id,
              article_code:stock.article.article_code,
              article_qte:stock.stock_quantity,
              da_qte:da.da_qte_article,
              statutcode: 1
            });
        }else if(da.da_etat_id < 4){
            return res.status(404).json({message:"En cours de validation", statutcode: 0});
        }else if(da.da_etat_id == 5 || da.da_etat_id == 6 ){
            return res.status(404).json({message:"Cette DA a été refusé ou annulé", statutcode: 0});
        }else if(da.da_etat_id == 7 ){
            return res.status(404).json({message:"Cette DA a été deja traité", statutcode: 0});
        }

        }).catch(err => {
        res.status(500).send({
            message: err.message,
            statutcode: 0
            });
        });
      }
      }).catch(err => {
        res.status(500).send({
            message: err.message,
            statutcode: 0
            });
        });
    };

    exports.ConfirmationRetrait = (req,res) => {
      const appointment = new Date();
        Da.update({
            da_etat_id: 7,
            da_retrait_mag_id:req.user_id,
            da_retrait_date : appointment
            },
            {
              where:{
                da_code: req.body.da_code,
             },
            }
          ).then(da => {
            CasierOrEmpl.findOne({
                    //CasierOrEmpl EtagerOrLocal
                    include: [
                        {
                            model: EtagerOrLocal,
                            include:[
                                {
                                    model:Magasin,
                                    where :{
                                        magasin_id : req.body.da_magasin_id,
                                    }
                                }
                            ]
                        }
                    ]
                }).then(casierorempl=>{
                    Stock.findOne({
                        where :{
                            articleArticleId : req.body.article_id,
                            casieroremplCasieroremplId : casierorempl.casierorempl_id
                        }
                    }).then(stock => {
                      
                        var qte_init = stock.stock_quantity;
                        var qte_debite = req.body.stock_quantity;
                        var reste = qte_init - qte_debite;
                      if (qte_init > qte_debite) {
                       
                        Stock.update({
                          stock_quantity: reste,
                          },
                          {
                              where: { 
                                  stock_id: stock.stock_id,
                              },
                          })
                          res.send({ 
                              message: "Retrait effectué avec succes!",
                              statutcode: 1 });
                      }else{
                        Da.update({
                          da_etat_id: 4
                          },
                          {
                            where:{
                              da_code: req.body.da_code,
                           },
                          }
                        )
                        res.send({ 
                          message: "Le Stock de l'article est inssufisant",
                          statutcode: 0 });
                        
                      }
                    }
                    )
                  })
                    }).catch(
                        err => {
                    res.status(500).send({ 
                        message: err.message ,
                        statutcode: 0 });
                    });
                };