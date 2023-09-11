module.exports = (sequelize,Sequelize) => {
    const DiType = sequelize.define("di_type", {
        DiType_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DiType_mane : {
            type: Sequelize.STRING
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
    return DiType;
}