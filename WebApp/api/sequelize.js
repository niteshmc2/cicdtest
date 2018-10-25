'use strict';
const mysql = require('mysql');
const Sequelize = require('sequelize');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Icarus6!8'
});

let dbName = "persons";
let sql = `create database if not exists ${dbName}`;
db.query(sql, (err, result) => {
    if (err) {
        console.log("Failed");
        throw err;
    }
    console.log("DB checked");
});
db.end();

const sequelize = new Sequelize('persons', 'root', 'Icarus6!8', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
  .then(() => {
        console.log('Sequelize Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;





