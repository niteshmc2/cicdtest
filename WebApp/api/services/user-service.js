'use strict';
const db = require('../db');

exports.search = function (username, callback) {
    let sql = `SELECT * FROM users WHERE userid = "${username}"`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            return false;
        }
        callback(result);
    });
}

exports.insert = function(user, callback){
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err) => {
        callback(err);    
    });
}