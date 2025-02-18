const { DataTypes } = require('sequelize'); 
const dbconfiguration = require('../config/database');

const User = dbconfiguration.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationCode: {
        type: DataTypes.STRING,
    },
    verificationCodeValidation: {
        type: DataTypes.INTEGER, 
    },
    forgotPasswordCode: {
        type: DataTypes.STRING,
    },
    forgotPasswordCodeValidation: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: "users",
    timestamps: true,
});

module.exports = User;
