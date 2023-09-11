module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      article_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      article_code: {
        type: Sequelize.STRING
      },
      article_name: {
        type: Sequelize.STRING
      },
      article_construct_ref: {
        type: Sequelize.STRING
      },
      article_cost: {
        type: Sequelize.STRING
      },
      article_u_messur: {
        type: Sequelize.STRING
      }
    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return Article;
};