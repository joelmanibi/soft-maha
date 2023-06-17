module.exports = (sequelize, Sequelize) => {
    const Magasin = sequelize.define("magasin", {
      magasin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      magasin_code: {
        type: Sequelize.STRING
      },
      magasin_site_id: {
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
      return Magasin;
};