module.exports = (sequelize, Sequelize) => {
    const Machine = sequelize.define("machine", {
      machine_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      machine_name: {
        type: Sequelize.STRING
      },
      machine_groupId: {
        type: Sequelize.INTEGER
      },
      machine_description: {
        type: Sequelize.TEXT
      },
      machine_image: {
        type: Sequelize.STRING
      }
    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return Machine;
};