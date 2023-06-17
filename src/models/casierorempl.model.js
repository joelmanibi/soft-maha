module.exports = (sequelize, Sequelize) => {
    const CasierOrEmpl = sequelize.define("casierorempl", {
      casierorempl_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      casierorempl_name: {
        type: Sequelize.STRING
      },
      casierorempl_type_id: {
        type: Sequelize.INTEGER
      },
      casierorempl_locate_id: {
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
      return CasierOrEmpl;
};