module.exports = (sequelize, Sequelize) => {
    const CasierOrEmplType = sequelize.define("casierorempl_type", {
      casierorempl_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      casierorempl_type_name: {
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
      return CasierOrEmplType;
};