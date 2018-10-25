'use strict';
const Transaction = require('../models/transaction');

exports.list = function (username, callback){
    Transaction.findAll({attributes: ['id', 'description', 'merchant','amount', 'date', 'category'],
                         where: { userid: username } })
               .then(result => callback('',result))
               .catch(err => callback(err));
}

exports.listOne = function (transId, callback){
    Transaction.findAll({attributes: ['attachmentid'],
        where: { id: transId } })
        .then(result => callback('',result))
        .catch(err => callback(err));
}

exports.add = function (transaction, callback){
    Transaction.create(transaction)
               .then(() => callback())
               .catch(err => callback(err))
}

exports.search = function (id, callback){
    Transaction.findAll({
        where: { id: id }
    })
        .then(result => callback('', result))
        .catch(err => callback(err));
}

exports.update = function ( updatedTr, callback){
        Transaction.update(updatedTr, {
            where: { id: updatedTr.id }
        })
            .then(() => callback())
            .catch(err => callback(err));
}


exports.delete = function (id, callback){
    Transaction.destroy({
        where: { id: id }
    }).then(()=>callback())
    .catch(err => callback(err));
}