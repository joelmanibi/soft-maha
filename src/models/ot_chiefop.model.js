module.exports = (sequelize,Sequelize) => {
    const otChiefOp = sequelize.define("ot_chief_op", {
        otChiefOp_id : {
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
    }
    );
    return otChiefOp;
}