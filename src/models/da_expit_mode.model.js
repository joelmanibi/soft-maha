module.exports = (sequelize, Sequelize) => {
    const ExpeditMode = sequelize.define("expeditmode", {
      expeditmode_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      expeditmode_name: {
        type: Sequelize.STRING
      },
      

    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return ExpeditMode;
};