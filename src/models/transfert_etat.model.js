module.exports = (sequelize, Sequelize) => {
    const TransfertEtat = sequelize.define("transfertetat", {
      transfertetat_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      transfertetat_name: {
        type: Sequelize.STRING,
      },
    },
      {
        timestamps: false,
        // If don't want createdAt
        timestamps: false,
        // If don't want updatedAt
        updatedAt: false,
      });
      return TransfertEtat;
};