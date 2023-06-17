module.exports = (sequelize, Sequelize) => {
    const Magasinier = sequelize.define("magasinier", {
      magasinier_id: {
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
      return Magasinier;
};