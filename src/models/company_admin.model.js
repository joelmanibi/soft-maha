module.exports = (sequelize, Sequelize) => {
    const CompanyAdmin = sequelize.define("company_admin", {
      company_admin_id: {
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
      return CompanyAdmin;
};