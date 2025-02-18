const { Sequelize } = require('sequelize');

const dbconfiguration = new Sequelize( 
    process.env.DB_NAME, 
    process.env.USER_NAME,
    process.env.PWD, {
        host: process.env.HOST_NAME,
        dialect: process.env.DIALECT,
});

module.exports = dbconfiguration;