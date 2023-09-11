module.exports = (sequelize, Sequelize) => {
    const Ot = sequelize.define("ot", {
      ot_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ot_di: {
        type: Sequelize.INTEGER
      },
      ot_etatId: {
        type: Sequelize.INTEGER
      },
      operationType: {
        type: Sequelize.INTEGER
      },
      operationChief: {
        type: Sequelize.INTEGER
      },
      ot_repport: {
        type: Sequelize.TEXT
      },
      ot_usineId : {
        type: Sequelize.INTEGER
      },
      unvalidationDetail: {
        type: Sequelize.TEXT
      },
      debutPrevu: {
        type: Sequelize.DATE
      },
      finPrevu: {
        type: Sequelize.DATE
      },
      receptionDate: {
        type: Sequelize.DATE
      },
      debutReel: {
        type: Sequelize.DATE
      },
      finReel: {
        type: Sequelize.DATE
      },
      validationDate: {
        type: Sequelize.DATE
      },
      unvalidationDate: {
        type: Sequelize.DATE
      },
      clotureDate: {
        type: Sequelize.DATE
      },
    

    });
      return Ot;
};