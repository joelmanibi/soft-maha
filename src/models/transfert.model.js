module.exports = (sequelize, Sequelize) => {
    const Transfert = sequelize.define(
        "transfert",
        {
            transfert_id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            transfert_code: {
                type: Sequelize.STRING
            },
            transfert_demandeur: {
                type: Sequelize.INTEGER
            },
            transfert_driver: {
                type: Sequelize.INTEGER
            },
            transfert_out_cu: {
                type: Sequelize.INTEGER
            },
            transfert_out_magasin: {
                type: Sequelize.INTEGER
            },
            transfert_out_magasinier: {
                type: Sequelize.INTEGER
            },
            transfert_in_magasin: {
                type: Sequelize.INTEGER
            },
            transfert_in_magasinier: {
                type: Sequelize.INTEGER
            },
            transfert_article: {
                type: Sequelize.INTEGER
            },
            transfert_quantity: {
                type: Sequelize.FLOAT
            },
            transfert_date_dem: {
                type: Sequelize.DATE
            },
            transfert_validcu_date: {
                type: Sequelize.DATE
            },
            transfert_out_date: {
                type: Sequelize.DATE
            },
            transfert_in_date: {
                type: Sequelize.DATE
            },
            transfert_etat: {
                type: Sequelize.INTEGER
            },
        });
        return Transfert;
}