module.exports = (sequelize, Sequelize) => {
    const DaEtat = sequelize.define("daetat", {
      daetat_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      daetat_name: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return DaEtat;
};