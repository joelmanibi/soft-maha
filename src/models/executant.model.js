module.exports = (sequelize,Sequelize) => {
    const Executant = sequelize.define("executant", {
        Executant_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Executant_firstname : {
            type: Sequelize.STRING
        },
        Executant_lastname : {
            type: Sequelize.STRING
        },
        Executant_operation : {
            type: Sequelize.INTEGER
        }
    }
    );
    return Executant;
}