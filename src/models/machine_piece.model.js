module.exports = (sequelize, Sequelize) => {
    const MachinePiece = sequelize.define("machine_piece", {
      machine_piece_id: {
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
      return MachinePiece;
};