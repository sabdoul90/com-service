const {DataTypes} = require('sequelize');
const dbconfiguration = require('../config/database');
const User = require('./userModel');

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
        userId :{
            type:DataTypes.INTEGER,
            allowNull:false,
            references: {
                model:User,
                key:"id"
            },
        }
    },{
        tableName: "informations",
        timestamps:true,
    });

    module.exports = Information;