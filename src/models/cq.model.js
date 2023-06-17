module.exports = (sequelize, Sequelize) => {
    const Cq = sequelize.define("cq", {
      cq_id: {
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
      return Cq;
};