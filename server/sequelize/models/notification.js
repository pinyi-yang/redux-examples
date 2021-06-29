const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
    sequelize.define("Notification", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    })
}