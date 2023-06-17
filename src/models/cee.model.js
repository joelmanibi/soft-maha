module.exports = (sequelize, Sequelize) => {
    const Cee = sequelize.define("cee", {
      cee_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return Cee;
};