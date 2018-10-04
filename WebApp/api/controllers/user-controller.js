'use strict';

const userService = require('../services/user-service'),
        bcrypt = require('bcryptjs');


exports.register = function (req, res){
    var username = req.body.username;
    console.log(req.body);
    userService.search(username, (result) => {
        console.log(result);
        if (result) {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
            if (req.body.username == null || req.body.password == null){
                res.status(400).json({sc:400,status:"Bad request"});
                return;
            }
                let user = { userid: req.body.username, password: req.body.password };
                userService.insert(user, (err)=>{
                    if (err) {
                        console.log(err);
                        res.status(400).json({sc:400,status:"User already exists"});
                    } else {
                        console.log('new user added');
                        res.status(201).json({sc:201,status:"User added successfully"});
                    }
                });
        } else if (result == false) {
            console.log(err);
            res.error.send("DB error");
        }
    });
}


exports.time = function(req, res) {
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();

    var creds = plain_auth.split(':');
    var username = creds[0];
    var password = creds[1];

    userService.search(username, (result)=>{
        if (result) {
            if (result.length == 0) {
                res.status(400).json({ error: "User not found" ,status:'fail'});
            }
            else if (bcrypt.compareSync(password, result[0].password)) {
                var d = new Date(2018, 11, 24, 10, 33, 30);
                res.status(200).json({login:"Logged in at " + d ,status:'success'});
            } else {
                res.status(400).json({ error: "incorrect password" ,status:'fail'});
            }
        } else if (result == false) {
            console.log(err);
            res.error.send("DB error");
        }
    });

}