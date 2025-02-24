const { DataTypes } = require('sequelize');
const dbconfiguration = require('../config/database');
const Information = require('./informationmodel');

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
        information :{
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model:Information,
                key : "id"
            }
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

Information.hasMany(File, {foreignKey:"information", onDelete : 'CASCADE'});
File.belongsTo(Information, {foreignKey:"information"});
module.exports = File;