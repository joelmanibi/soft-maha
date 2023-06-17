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


/////toutes les realtion many to many
db.user.belongsToMany(db.company, { through: 'company_admin' });
db.company.belongsToMany(db.user, { through: 'company_admin' });

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

db.user.belongsToMany(db.usine, { through: 'cee' });
db.usine.belongsToMany(db.user, { through: 'cee' });

db.user.belongsToMany(db.usine, { through: 'ate' });
db.usine.belongsToMany(db.user, { through: 'ate' });

db.article.belongsToMany(db.casierorempl, { through: 'stock' });
db.casierorempl.belongsToMany(db.article, { through: 'stock' });


/////toutes les realtion one to many
db.site.hasMany(db.magasin, { foreignKey: 'magasin_site_id' });
db.magasin.belongsTo(db.site,{ foreignKey: 'magasin_site_id'});

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

module.exports = db;






