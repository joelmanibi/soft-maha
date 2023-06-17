module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("companie", {
      company_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      company_acronym: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_logo: {
        type: Sequelize.STRING
      },
    });
    return Company;
  };