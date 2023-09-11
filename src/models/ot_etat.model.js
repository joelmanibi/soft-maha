module.exports = (sequelize,Sequelize) => {
    const OtEtat = sequelize.define("ot_etat", {
        OtEtat_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OtEtat_mane : {
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
    return OtEtat;
}