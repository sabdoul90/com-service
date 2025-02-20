const { DataTypes } = require('sequelize');
const dbconfiguration = require('../config/database');

const File = dbconfiguration.define(
    "File",
    {
        id :{
            type : DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true,
        },
        nom:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        url:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        type:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        size:{
            type : DataTypes.INTEGER,
            allowNull : true,
        }
    },
    {
        tableName: "files",
        timestamps: true,
    }
);

module.exports = File;