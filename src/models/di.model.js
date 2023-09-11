module.exports = (sequelize,Sequelize) => {
    const Di = sequelize.define("di", {
        di_id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        di_code : {
            type: Sequelize.STRING
        },
        di_typeId : {
            type: Sequelize.INTEGER
        },
        di_priorityId : {
            type: Sequelize.INTEGER
        },
        detectedBy : {
            type: Sequelize.INTEGER
        },
        di_machine : {
            type: Sequelize.INTEGER
        },
        di_etatId : {
            type: Sequelize.INTEGER
        },
        di_issueDetected : {
            type: Sequelize.INTEGER
        },
        di_usineId : {
            type: Sequelize.INTEGER
        },
        di_cancelRaison : {
            type: Sequelize.TEXT
        },
        di_commentaire : {
            type: Sequelize.TEXT
        },
        closedAt : {
            type: Sequelize.DATE
        },
        
    });
    return Di;
}