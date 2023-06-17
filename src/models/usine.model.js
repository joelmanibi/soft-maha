module.exports = (sequelize, Sequelize) => {
    const Usine = sequelize.define("usine", {
      usine_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      usine_code: {
        type: Sequelize.STRING
      },
      usine_name: {
        type: Sequelize.STRING
      },
      usine_magasin_id: {
        type: Sequelize.INTEGER
      },

    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return Usine;
};