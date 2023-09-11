module.exports = (sequelize, Sequelize) => {
    const MachineUsine = sequelize.define("machine_usine", {
      machine_usine_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      dateInstallation: {
        type: Sequelize.DATE
      }
    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return MachineUsine;
};