module.exports = (sequelize,Sequelize) => {
    const DiEtat = sequelize.define("di_etat", {
        DiEtat_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DiEtat_mane : {
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
    return DiEtat;
}