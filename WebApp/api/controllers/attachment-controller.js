'use strict';
const transactionService = require('../services/transaction-service');
const userService = require('../services/user-service');
const attachmentService = require('../services/attachment-service');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');



exports.list = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    var password = creds[1];
    const transId = req.params['id'];
    userService.search(userid, (result) => {
        if (result) {
            if (result.length == 0) {
                res.status(400).json({ error: "User not found", status: 'fail' });
            }
            else if (bcrypt.compareSync(password, result[0].password)) {
                console.log(userid);
                transactionService.listOne(transId, (err, result) => {
                    if (err != '') {
                        console.log(err);
                        res.status(400).json({ sc: 400, status: "DB err" });
                    }
                    var attachId = result[0].dataValues.attachmentid;
                    attachmentService.search(attachId,(err, result) => {
                        if (err != '') {
                            console.log(err);
                            res.status(400).json({ sc: 400, status: "DB err" });
                        }
                        res.status(200).json(result);
                    })

                })
            } else {
                res.status(400).json({ error: "incorrect password", status: 'fail' });
            }
        } else if (result == false) {
            console.log(err);
            res.error.send("DB error");
        }
    });

}

exports.add = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    var password = creds[1];
    userService.search(userid, (result) => {
        if (result) {
            if (result.length == 0) {
                res.status(400).json({ error: "User not found", status: 'fail' });
            }
            else if (bcrypt.compareSync(password, result[0].password)) {
                console.log("the request id sent is " + req.params['id']);
                transactionService.search(req.params['id'], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Bad request");
                    }
                    if (result.length == 0) {
                        res.status(400).send("Bad request");
                        return;
                    }
                    if (result[0].userid === userid) {

                        console.log('inside yoyo')
                        if (!req.files)
                            return res.status(400).json({ error: "file not found", status: 'fail' });
                        let sampleFile = req.files.sampleFile;
                        console.log(sampleFile);
                        const URL ='C:\\Users\\yoges\\Desktop\\server\\' + sampleFile.name;
                        let attachid = uuidv1();
                        let updatedTr = {
                            id: req.params.id,
                            attachmentid: attachid
                        };
                        let attachment = {
                            id: attachid,
                            url: URL
                        };
                        transactionService.update( updatedTr, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ sc: 400, status: "Bad request" });
                                return;
                            }
                            attachmentService.add(attachment, (err) => {
                                if (err) {
                                    console.log(err);
                                    res.status(400).json({sc: 400, status: "Bad request"});
                                    return;
                                }
                                sampleFile.mv(URL, function(err) {
                                    if (err)
                                        return res.status(500).send(err);
                                    res.status(200).json({ message: "File uploaded", status: 'success' });
                                });
                                // res.status(201).json({ sc: 201, status: "Created/Updated - Invalid keys, if passed will be ignored" });
                            })

                        })
                    } else
                        res.status(401).send("Unauthorized");
                })
            } else {
                res.status(400).json({ error: "incorrect password", status: 'fail' });
            }
        } else if (result == false) {
            console.log(err);
            res.error.send("DB error");
        }
    });
    

}

exports.update = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    var password = creds[1];
    userService.search(userid, (result) => {
        if (result) {
            if (result.length == 0) {
                res.status(400).json({ error: "User not found", status: 'fail' });
            }
            else if (bcrypt.compareSync(password, result[0].password)) {
                console.log("the request id sent is " + req.params['id']);
                transactionService.search(req.params['id'], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Bad request");
                    }
                    if (result.length == 0) {
                        res.status(400).send("Bad request");
                        return;
                    }
                    if (result[0].userid === userid) {
                        if (!req.files)
                            return res.status(400).json({ error: "file not found", status: 'fail' });
                        let sampleFile = req.files.sampleFile;
                        // console.log(sampleFile);
                        const URL ='C:\\Users\\yoges\\Desktop\\server\\' + sampleFile.name;
                        let updatedAttmt = {
                            id: req.params['idAttachments'],
                            url: URL
                        };
                        sampleFile.mv(URL, function(err) {
                            if (err)
                                return res.status(500).send(err);
                            // res.status(200).json({ message: "File uploaded", status: 'success' });
                        });
                        attachmentService.update( updatedAttmt, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ sc: 400, status: "Bad request" });
                                return;
                            }
                            res.status(201).json({ sc: 201, status: "File Updated - Invalid keys, if passed will be ignored" });
                        })
                    } else
                        res.status(401).send("Unauthorized");
                })
            } else {
                res.status(400).json({ error: "incorrect password", status: 'fail' });
            }
        } else if (result == false) {
            console.log(err);
            res.error.send("DB error");
        }
    });


}

exports.delete = function(req, res){
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var userid = creds[0];
    var password = creds[1];
    userService.search(userid, (result) => {
        if (result) {
            if (result.length == 0) {
                res.status(400).json({ error: "User not found", status: 'fail' });
            }
            else if (bcrypt.compareSync(password, result[0].password)) {
                transactionService.search(req.params['id'], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Bad request");
                    }
                    if (result.length == 0) {
                        res.status(400).send("Bad request");
                        return;
                    }
                    if (result[0].userid === userid) {
                        let updatedTr = {
                            id: req.params.id,
                            attachmentid: null
                        };
                        const attachId = req.params['idAttachments']
                        transactionService.update( updatedTr, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ sc: 400, status: "Bad request" });
                                return;
                            }
                            var URL;
                            attachmentService.search(attachId,(err, result) => {
                                if (err != '') {
                                    console.log(err);
                                    res.status(400).json({ sc: 400, status: "DB err" });
                                }
                                else {
                                    URL = result[0].url;
                                    console.log(URL);

                                    attachmentService.delete(attachId, (err) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(400).json({sc: 400, status: "DB err"});
                                        }
                                        res.status(200).json('No content');
                                    })
                                }
                            })
                        })
                    } else
                        res.status(401).send("Unauthorized");
                })
            } else {
                res.status(400).json({ error: "incorrect password", status: 'fail' });
            }
        } else if (result == false) {
            console.log(err);
            res.error.send("DB error");
        }
    });
}

