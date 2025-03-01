const { DataTypes } = require("sequelize");
const dbconfiguration = require("../config/database");
const Information = require("./informationmodel");

const Partage = dbconfiguration.define(
    "Partage",
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        proprietaire : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        information : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : Information,
                key : "id"
            }
        }
    },
    {
        tableName : "partages",
        timestamps : true
    }

);

Information.hasMany(Partage,{foreignKey : "information", onDelete : "CASCADE"});
Partage.belongsTo(Information, {foreignKey:"information"});

module.exports = Partage;