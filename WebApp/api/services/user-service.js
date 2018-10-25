'use strict';

const User = require('../models/user');

exports.search = function (username, callback) {
    User.findAll({where : { userid : username }})
        .then((result)=>{
            callback(result);
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
}

exports.insert = function(user, callback){
    User.create(user)
        .then(() => callback())
        .catch((err) => {
            console.log(err);
            callback(err);
        })
}