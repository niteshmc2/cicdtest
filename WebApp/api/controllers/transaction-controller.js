'use strict';
const transactionService = require('../services/transaction-service');
const uuidv1 = require('uuid/v1');

exports.list = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    console.log(userid);
    transactionService.list(userid, (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send("DB err");
        }
        res.status(200).json(result);
    })
}

exports.add = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    let transaction = {
        id: uuidv1(),
        description: req.body.description,
        merchant: req.body.merchant,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category,
        userid: userid
    };
    transactionService.add(transaction, (err, result)=>{
        if(err){
            console.log(err);
            res.status(400).send("Bad Request");
            return;
        }
        res.status(201).send("Created");
    });
}

exports.update = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    console.log("the request id sent is "+req.params['id']);
    transactionService.search(req.params['id'], (err, result)=>{
        if (err) {
            console.log(err);
            res.status(400).send("Bad request");
        }
        if (result.length == 0) {
            res.status(400).send("Bad request");
            return;
        }
        if (result[0].userid === userid) {
            let updatedTr = req.body;
            transactionService.update(req.params.id, updatedTr, (err, result)=>{
                if(err){
                    console.log(err);
                    res.status(400).send("Bad request");
                    return;
                }
                res.status(201).send("Created/Updated");
            })
        } else 
             res.status(401).send("Unauthorized");
    })

}

exports.delete = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];

    transactionService.search(req.params['id'], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Bad request");
        }
        if(result.length == 0){
            res.status(400).send("Bad request");
            return;
        }
        if (result[0].userid === userid) {
            transactionService.delete(req.params['id'], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send("Bad request");
                }
                res.status(204).send("No content");
            })
        } else
            res.status(401).send("Unauthorized");
    })
}