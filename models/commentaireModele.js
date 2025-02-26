const { DataTypes } = require("sequelize");
const dbconfiguration = require("../config/database");
const Information = require("./informationmodel");

const Commentaire = dbconfiguration.define(
    "Commentaire",
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        type:{
            type : DataTypes.TEXT,
            allowNull: false
        },
        content:{
            type : DataTypes.TEXT,
            allowNull: false
        },

        proprietaire :{
            type:DataTypes.TEXT,
            allowNull:true
        },
        information:{
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model:Information,
                key : "id"
            }
        }
    },
    {
        tableName : "commenatire",
        timestamps : true
    }
);

Information.hasMany(Commentaire, {foreignKey:"information", onDelete:"CASCADE"});
Commentaire.belongsTo(Information,{foreignKey:"information"});

module.exports = Commentaire;