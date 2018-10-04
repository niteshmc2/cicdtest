'use strict';
const db = require('../db');

exports.list = function (username, callback){
    let sql = `select id, description, merchant, amount, date, category from transactions where userid = "${username}"`;
    db.query(sql, (err, result)=>{
        callback(err, result);
    })
}

exports.add = function (transaction, callback){
    let sql = 'INSERT INTO transactions SET ?';
    db.query(sql, transaction, (err, result)=>{
        callback(err, result);  
    })
}

exports.search = function (id, callback){
    let sql = `select * from transactions where id = "${id}"`;
    console.log(sql);
    db.query(sql, (err, result)=>{
        console.log("Service res "+result);
        callback(err, result);
    })
}

exports.update = function (id, updatedTr, callback){
    let sql = "update transactions set";
    for (var key in updatedTr) {
        if (updatedTr.hasOwnProperty(key)) {
            sql = sql + " " + key + "=" + "'" + updatedTr[key]+ "'" + ",";
        }
    }
    sql = sql.substring(0, sql.lastIndexOf(","));
    sql = sql + " where id = " + "'" + id + "'";
    console.log("Capre diem!  ++++++++  ------------  +++++++\n"+sql);
    db.query(sql, (err, result) => {
        callback(err, result);
    })
}


exports.delete = function (id, callback){
    let sql = `delete from transactions where id="${id}"`;
    db.query(sql, (err, result) => {
        callback(err, result);
    })
}