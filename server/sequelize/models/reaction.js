const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
    sequelize.define("Reaction", {
        thumbsUp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        hooray: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        heart: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        rocket: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        eyes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    })
}