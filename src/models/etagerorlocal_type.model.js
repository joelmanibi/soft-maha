module.exports = (sequelize, Sequelize) => {
    const EtagerOrLocalType = sequelize.define("etagerorlocal_type", {
      etagerorlocal_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      etagerorlocal_type_name: {
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
      return EtagerOrLocalType;
};