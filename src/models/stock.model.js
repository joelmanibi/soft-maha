module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define("stock", {
      stock_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      stock_quantity: {
        type: Sequelize.FLOAT
      },
      stock_seuil: {
        type: Sequelize.FLOAT
      },
      stock_locate_id: {
        type: Sequelize.INTEGER
      },
      casieroremplCasieroremplId: {
        type: Sequelize.INTEGER
      },
    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      }
      );
      return Stock;
};