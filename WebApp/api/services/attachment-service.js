'use strict';
const Attachment = require('../models/attachment');

// exports.list = function (username, callback){
//     Transaction.findAll({attributes: ['id', 'description', 'merchant','amount', 'date', 'category'],
//                          where: { userid: username } })
//                .then(result => callback('',result))
//                .catch(err => callback(err));
// }

exports.add = function (attachment, callback){
    Attachment.create(attachment)
               .then(() => callback())
               .catch(err => callback(err))
}

exports.search = function (id, callback){
    Attachment.findAll({
        where: { id: id }
    })
        .then(result => callback('', result))
        .catch(err => callback(err));
}

exports.update = function ( updatedAmnt, callback){
    Attachment.update(updatedAmnt, {
            where: { id: updatedAmnt.id }
        })
            .then(() => callback())
            .catch(err => callback(err));
}


exports.delete = function (id, callback){
    Attachment.destroy({
        where: { id: id }
    }).then(()=>callback())
    .catch(err => callback(err));
}