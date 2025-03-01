const { DataTypes } = require("sequelize");
const dbconfiguration = require("../config/database");
const Information = require("./informationmodel");

const Like = dbconfiguration.define(
    "Likes",
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
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
        tableName : "likes",
        timestamps : true

    }

);

Information.hasMany(Like, {foreignKey : "information", onDelete : "CASCADE"});
Like.belongsTo(Information, {foreignKey : "information"});

module.exports = Like;