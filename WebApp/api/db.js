'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Icarus6!8'
});

db.connect((err) => {
    if (err) {
        console.log("Failed");
        throw err;
    }
    console.log("Connedted to db");
});
let dbName = "persons";
let sql = `create database if not exists ${dbName}`;
queryDB(sql, "DB checked");

sql = `use ${dbName}`;
queryDB(sql, "DB used");

sql = `create table if not exists users(
    userid VARCHAR(100) not null,
    password VARCHAR(100) not null,
    primary key ( userid )
)`;
queryDB(sql, "Users table checked");

sql = `create table if not exists transactions(
    id VARCHAR(100) not null,
    description VARCHAR(100) not null,
    merchant VARCHAR(100) not null,
    amount VARCHAR(100) not null,
    date VARCHAR(100) not null,
    category VARCHAR(100) not null,
    userid VARCHAR(100) not null,
    primary key ( id )
)`;
queryDB(sql, "transactions table checked");

function queryDB(sql, msg) {
    db.query(sql, (err, result) => {
        if (err) {
            console.log("Failed");
            throw err;
        }
        console.log(msg);
    });
}

module.exports = db;

