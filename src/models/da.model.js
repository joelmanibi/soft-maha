module.exports = (sequelize, Sequelize) => {
    const Da = sequelize.define("da", {
      da_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      da_code: {
        type: Sequelize.STRING
      },
      //la machine sur laquelle l'article sera fixé
      da_imputation_ana: {
        type: Sequelize.STRING
      },
      da_qte_article: {
        type: Sequelize.FLOAT
      },
      da_article_id: {
        type: Sequelize.INTEGER
      },
      da_demandeur_id: {
        type: Sequelize.INTEGER
      },
      da_validn1_id: {
        type: Sequelize.INTEGER
      },
      da_validn2_id: {
        type: Sequelize.INTEGER
      },
      da_validn1_date: {
        type: Sequelize.DATE
      },
      da_validn2_date: {
        type: Sequelize.DATE
      },
      da_retrait_date: {
        type: Sequelize.DATE
      },
      //magasinier du retrait da_magasin_id
      da_retrait_mag_id: {
        type: Sequelize.INTEGER
      },
      da_magasin_id: {
        type: Sequelize.INTEGER
      },
      da_expedit_mode_id: {
        type: Sequelize.INTEGER
      },
      da_etat_id: {
        type: Sequelize.INTEGER
      },
      
    });
      return Da;
};