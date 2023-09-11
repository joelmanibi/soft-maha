module.exports = (sequelize,Sequelize) => {
    const OtExecutant = sequelize.define("ot_executant", {
        OtExecutant_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }
    );
    return OtExecutant;
}