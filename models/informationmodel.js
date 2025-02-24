const {DataTypes} = require('sequelize');
const dbconfiguration = require('../config/database');
const User = require('./userModel');
//const File = require('./fileModele');

const Information = dbconfiguration.define( "Information",
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        titre:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        user :{
            type:DataTypes.INTEGER,
            allowNull:true,
            references: {
                model:User,
                key:"id"
            },
        }
    },
    {
        tableName: "informations",
        timestamps:true,
    });

module.exports = Information;