module.exports = (sequelize,Sequelize) => {
    const DiPriority = sequelize.define("di_priority", {
        DiPriority_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DiPriority_mane : {
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
    return DiPriority;
}