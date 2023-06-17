module.exports = (sequelize, Sequelize) => {
    const SiteAdmin = sequelize.define("site_admin", {
      site_admin_id: {
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
      return SiteAdmin;
};