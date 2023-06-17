module.exports = (sequelize, Sequelize) => {
    const EtagerOrLocal = sequelize.define("etagerorlocal", {
      etagerorlocal_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      etagerorlocal_name: {
        type: Sequelize.STRING
      },
      etagerorlocal_type_id: {
        type: Sequelize.INTEGER
      },
      etagerorlocal_magasin_id: {
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
      return EtagerOrLocal;
};