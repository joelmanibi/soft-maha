module.exports = (sequelize, Sequelize) => {
    const MachineGroup = sequelize.define("machine_group", {
      machine_group_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      machine_group_name: {
        type: Sequelize.STRING
      },
      
    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return MachineGroup;
};