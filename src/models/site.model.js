module.exports = (sequelize, Sequelize) => {
    const Site = sequelize.define("site", {
      site_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      site_name: {
        type: Sequelize.STRING
      },
      site_company_id: {
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
      return Site;
};