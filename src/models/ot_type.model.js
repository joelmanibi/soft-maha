module.exports = (sequelize,Sequelize) => {
    const otType = sequelize.define("ot_type", {
        otType_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        otType_mane : {
            type: Sequelize.STRING
        },
        otType_description : {
            type: Sequelize.TEXT
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
    return otType;
}