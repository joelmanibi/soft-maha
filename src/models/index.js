const config = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.article = require("../models/article.model.js")(sequelize, Sequelize);
db.casierorempl_type = require("./casierorempl_type.model.js")(sequelize, Sequelize);
db.casierorempl = require("../models/casierorempl.model.js")(sequelize, Sequelize);
db.company_admin = require("../models/company_admin.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.da_etat = require("./da_etat.model.js")(sequelize, Sequelize);
db.da_expit_mode = require("../models/da_expit_mode.model.js")(sequelize, Sequelize);
db.da = require("../models/da.model.js")(sequelize, Sequelize);
db.etagerorlocal_type = require("../models/etagerorlocal_type.model.js")(sequelize, Sequelize);
db.etagerorlocal = require("../models/etagerorlocal.model.js")(sequelize, Sequelize);
db.magasin = require("../models/magasin.model.js")(sequelize, Sequelize);
db.magasinier = require("../models/magasinier.model.js")(sequelize, Sequelize);
db.site_admin = require("../models/site_admin.model.js")(sequelize, Sequelize);
db.site = require("../models/site.model.js")(sequelize, Sequelize);
db.stock = require("../models/stock.model.js")(sequelize, Sequelize);
db.transfert_etat = require("../models/transfert_etat.model.js")(sequelize, Sequelize);
db.transfert = require("../models/transfert.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.user_type = require("../models/user_type.model.js")(sequelize, Sequelize);
db.usine = require("../models/usine.model.js")(sequelize, Sequelize);
db.cu = require("../models/cu.model.js")(sequelize, Sequelize);
db.ate = require("../models/ate.model.js")(sequelize, Sequelize);
db.cem = require("../models/cem.model.js")(sequelize, Sequelize);
db.cee = require("../models/cee.model.js")(sequelize, Sequelize);
db.cq = require("../models/cq.model.js")(sequelize, Sequelize);
db.machine = require("../models/machine.model.js")(sequelize, Sequelize);
db.machine_usine = require("../models/machine_usine.model.js")(sequelize, Sequelize);
db.machine_piece = require("../models/machine_piece.model.js")(sequelize, Sequelize);
db.machine_group = require("../models/machine_group.model.js")(sequelize, Sequelize);
db.di = require("../models/di.model.js")(sequelize, Sequelize);
db.di_issue = require("../models/di_issue.model.js")(sequelize, Sequelize);
db.di_priority = require("../models/di_priority.model.js")(sequelize, Sequelize);
db.di_type = require("../models/di_type.model.js")(sequelize, Sequelize);
db.di_etat = require("../models/di_etat.model.js")(sequelize, Sequelize);
db.executant = require("../models/executant.model.js")(sequelize, Sequelize);
db.ot = require("../models/ot.model.js")(sequelize, Sequelize);
db.ot_executant = require("../models/ot_executant.model.js")(sequelize, Sequelize);

db.ot_chiefop = require("../models/ot_chiefop.model.js")(sequelize, Sequelize);
db.ot_type = require("../models/ot_type.model.js")(sequelize, Sequelize);
db.ot_etat = require("../models/ot_etat.model.js")(sequelize, Sequelize);

/////toutes les realtion many to many
db.user.belongsToMany(db.company, { through: 'company_admin' });
db.company.belongsToMany(db.user, { through: 'company_admin' });

db.executant.belongsToMany(db.ot, { through: 'ot_executant' });
db.ot.belongsToMany(db.executant, { through: 'ot_executant' });

db.usine.hasMany(db.ot, { foreignKey: 'ot_usineId' });
db.ot.belongsTo(db.usine,{ foreignKey: 'ot_usineId'});

db.machine.belongsToMany(db.article, {through: 'machine_piece'});
db.article.belongsToMany(db.machine,{through:'machine_piece'});

db.machine.belongsToMany(db.usine, {through: 'machine_usine'});
db.usine.belongsToMany(db.machine,{through:'machine_usine'});

db.user.belongsToMany(db.site, { through: 'site_admin' });
db.site.belongsToMany(db.user, { through: 'site_admin' });

db.user.belongsToMany(db.magasin, { through: 'magasinier' });
db.magasin.belongsToMany(db.user, { through: 'magasinier' });

db.user.belongsToMany(db.usine, { through: 'cu' });
db.usine.belongsToMany(db.user, { through: 'cu' });

db.user.belongsToMany(db.usine, { through: 'cem' });
db.usine.belongsToMany(db.user, { through: 'cem' });

db.user.belongsToMany(db.usine, { through: 'cq' });
db.usine.belongsToMany(db.user, { through: 'cq' });

db.user.belongsToMany(db.usine, { through: 'ot_chief_op' });
db.usine.belongsToMany(db.user, { through: 'ot_chief_op' });

db.user.belongsToMany(db.usine, { through: 'cee' });
db.usine.belongsToMany(db.user, { through: 'cee' });

db.user.belongsToMany(db.usine, { through: 'ate' });
db.usine.belongsToMany(db.user, { through: 'ate' });

db.article.belongsToMany(db.casierorempl, { through: 'stock' });
db.casierorempl.belongsToMany(db.article, { through: 'stock' });


/////toutes les realtion one to many
db.site.hasMany(db.magasin, { foreignKey: 'magasin_site_id' });
db.magasin.belongsTo(db.site,{ foreignKey: 'magasin_site_id'});


db.di_type.hasMany(db.di, { foreignKey: 'di_typeId' });
db.di.belongsTo(db.di_type,{ foreignKey: 'di_typeId'});

db.di_priority.hasMany(db.di, { foreignKey: 'di_priorityId' });
db.di.belongsTo(db.di_priority,{ foreignKey: 'di_priorityId'});

db.usine.hasMany(db.di, { foreignKey: 'di_usineId' });
db.di.belongsTo(db.usine,{ foreignKey: 'di_usineId'});

db.user.hasMany(db.di, { foreignKey: 'detectedBy' });
db.di.belongsTo(db.user,{ foreignKey: 'detectedBy'});

db.machine.hasMany(db.di, { foreignKey: 'di_machine' });
db.di.belongsTo(db.machine,{ foreignKey: 'di_machine'});

db.di_etat.hasMany(db.di, { foreignKey: 'di_etatId' });
db.di.belongsTo(db.di_etat,{ foreignKey: 'di_etatId'});

db.di_issue.hasMany(db.di, { foreignKey: 'di_issueDetected' });
db.di.belongsTo(db.di_issue,{ foreignKey: 'di_issueDetected'});

db.di.hasMany(db.ot, { foreignKey: 'ot_di' });
db.ot.belongsTo(db.di,{ foreignKey: 'ot_di'});

db.ot_type.hasMany(db.ot, { foreignKey: 'operationType' });
db.ot.belongsTo(db.ot_type,{ foreignKey: 'operationType'});

db.user.hasMany(db.magasinier, { foreignKey: 'userUserId' });
db.magasinier.belongsTo(db.user,{ foreignKey: 'userUserId'});

db.magasin.hasMany(db.magasinier, { foreignKey: 'magasinMagasinId' });
db.magasinier.belongsTo(db.magasin,{ foreignKey: 'magasinMagasinId'});

db.ot_etat.hasMany(db.ot, { foreignKey: 'ot_etatId' });
db.ot.belongsTo(db.ot_etat,{ foreignKey: 'ot_etatId'});

db.ot_chiefop.hasMany(db.ot, { foreignKey: 'operationChief' });
db.ot.belongsTo(db.ot_chiefop,{ foreignKey: 'operationChief'});

db.executant.hasMany(db.ot_chiefop, { foreignKey: 'Executant_operation' });
db.ot_chiefop.belongsTo(db.executant,{ foreignKey: 'Executant_operation'});

db.article.hasMany(db.stock, { foreignKey: 'articleArticleId' });
db.stock.belongsTo(db.article,{ foreignKey: 'articleArticleId'});

db.magasin.hasMany(db.usine, { foreignKey: 'usine_magasin_id' });
db.usine.belongsTo(db.magasin,{ foreignKey: 'usine_magasin_id'});

db.company.hasMany(db.site, { foreignKey: 'site_company_id' });
db.site.belongsTo(db.company,{ foreignKey: 'site_company_id'});

db.magasin.hasMany(db.etagerorlocal, { foreignKey: 'etagerorlocal_magasin_id' });
db.etagerorlocal.belongsTo(db.magasin,{ foreignKey: 'etagerorlocal_magasin_id'});

db.magasin.hasMany(db.etagerorlocal, { foreignKey: 'etagerorlocal_magasin_id' });
db.etagerorlocal.belongsTo(db.magasin,{ foreignKey: 'etagerorlocal_magasin_id'});

db.etagerorlocal_type.hasMany(db.etagerorlocal, { foreignKey: 'etagerorlocal_type_id' });
db.etagerorlocal.belongsTo(db.etagerorlocal_type,{ foreignKey: 'etagerorlocal_type_id'});

db.etagerorlocal.hasMany(db.casierorempl, { foreignKey: 'casierorempl_locate_id' });
db.casierorempl.belongsTo(db.etagerorlocal,{ foreignKey: 'casierorempl_locate_id'});

db.casierorempl_type.hasMany(db.casierorempl, { foreignKey: 'casierorempl_type_id' });
db.casierorempl.belongsTo(db.casierorempl_type,{ foreignKey: 'casierorempl_type_id'});

db.user_type.hasMany(db.user, { foreignKey: 'user_role' });
db.user.belongsTo(db.user_type,{ foreignKey: 'user_role'});

db.user.hasMany(db.da, { foreignKey: 'da_demandeur_id'  });
db.da.belongsTo(db.user,{ foreignKey: 'da_demandeur_id', as: 'demandeur'});

db.user.hasMany(db.da, { foreignKey: 'da_validn1_id'  });
db.da.belongsTo(db.user,{ foreignKey: 'da_validn1_id', as: 'valideurn1'});

db.article.hasMany(db.da, { foreignKey: 'da_article_id'  });
db.da.belongsTo(db.article,{ foreignKey: 'da_article_id'});

db.user.hasMany(db.da, { foreignKey: 'da_validn2_id'  });
db.da.belongsTo(db.user,{ foreignKey: 'da_validn2_id', as: 'valideurn2'});

db.user.hasMany(db.da, { foreignKey: 'da_retrait_mag_id'  });
db.da.belongsTo(db.user,{ foreignKey: 'da_retrait_mag_id', as: 'magasinier'});

db.magasin.hasMany(db.da, { foreignKey: 'da_magasin_id'  });
db.da.belongsTo(db.magasin,{ foreignKey: 'da_magasin_id', as: 'magasin'});

db.da_expit_mode.hasMany(db.da, { foreignKey: 'da_expedit_mode_id'  });
db.da.belongsTo(db.da_expit_mode,{ foreignKey: 'da_expedit_mode_id'});

db.da_etat.hasMany(db.da, { foreignKey: 'da_etat_id'  });
db.da.belongsTo(db.da_etat,{ foreignKey: 'da_etat_id'});

db.user.hasMany(db.transfert, { foreignKey: 'transfert_demandeur'  });
db.transfert.belongsTo(db.user,{ foreignKey: 'transfert_demandeur', as: 'demandeur'});

db.user.hasMany(db.transfert, { foreignKey: 'transfert_driver'  });
db.transfert.belongsTo(db.user,{ foreignKey: 'transfert_driver', as: 'driver'});

db.user.hasMany(db.transfert, { foreignKey: 'transfert_out_cu'  });
db.transfert.belongsTo(db.user,{ foreignKey: 'transfert_out_cu', as: 'cu_out'});

db.magasin.hasMany(db.transfert, { foreignKey: 'transfert_out_magasin'  });
db.transfert.belongsTo(db.magasin,{ foreignKey: 'transfert_out_magasin', as: 'magasinier_out'});

db.user.hasMany(db.transfert, { foreignKey: 'transfert_out_magasinier'  });
db.transfert.belongsTo(db.user,{ foreignKey: 'transfert_out_magasinier', as: 'magasinier_t_out'});

db.magasin.hasMany(db.transfert, { foreignKey: 'transfert_in_magasin'  });
db.transfert.belongsTo(db.magasin,{ foreignKey: 'transfert_in_magasin', as: 'magasinier_in'});

db.user.hasMany(db.transfert, { foreignKey: 'transfert_in_magasinier'  });
db.transfert.belongsTo(db.user,{ foreignKey: 'transfert_in_magasinier', as: 'magasinier_t_in'});

db.article.hasMany(db.transfert, { foreignKey: 'transfert_article'});
db.transfert.belongsTo(db.article,{ foreignKey: 'transfert_article'});

db.transfert_etat.hasMany(db.transfert, { foreignKey: 'transfert_etat' });
db.transfert.belongsTo(db.transfert_etat,{ foreignKey: 'transfert_etat'});

db.magasin.hasMany(db.stock, { foreignKey: 'stock_locate_id' });
db.stock.belongsTo(db.magasin,{ foreignKey: 'stock_locate_id'});

db.casierorempl.hasMany(db.stock, { foreignKey: 'casieroremplCasieroremplId' });
db.stock.belongsTo(db.casierorempl,{ foreignKey: 'casieroremplCasieroremplId'});

db.machine_group.hasMany(db.machine, { foreignKey: 'machine_groupId'  });
db.machine.belongsTo(db.machine_group,{ foreignKey: 'machine_groupId'});


module.exports = db;