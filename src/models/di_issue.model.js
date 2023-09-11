module.exports = (sequelize,Sequelize) => {
    const Dissue = sequelize.define("di_issue", {
        Dissue_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Dissue_name : {
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
    return Dissue;
}