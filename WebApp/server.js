const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());
//app.use(app.router);
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Icarus6!8',
    database:'persons'
});

db.connect((err)=> {
    if(err){
        console.log("Failed");
        throw err;
    }
    console.log("Connedted to db");
});

app.route('/').get(function (req, res) {
    res.send('Basic auth app')
});

app.route('/time').get(verify, (req,res)=>{
    var auth = req.headers['authorization'];
    var tmp = auth.split(' ');   
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    console.log("Decoded Authorization ", plain_auth);

    var creds = plain_auth.split(':');
    var username = creds[0];
    var password = creds[1];

    console.log(username);
    let sql = `SELECT * FROM users WHERE userid = "${username}"`;
    console.log(sql);
    db.query(sql, (err, result)=>{
        if(err) {
            console.log("User not found");
            console.log(err);
            //return;
            res.error.send("User not found, Please register");
        }
        if (result.length == 0){
            res.status(400).json({ error: "User not found" });
        } 
        else if (bcrypt.compareSync(password, result[0].password)) {
            var d = new Date(2018, 11, 24, 10, 33, 30);
            res.status(200).send("Logged in at "+d);
            // res.status(200).json(thisguy);
        } else {
            res.status(400).json({ error: "incorrect password" });
        }
    });
});

function verify(req, res, next){
    const bearerHead = req.headers['authorization'];
    if (bearerHead == undefined) {
        res.status(403).send('User not logged in');
    } else {
        req.token = bearerHead;
        next();
    }
}

app.post('/user/register',(req,res)=>{
    let sql = `SELECT * FROM users WHERE id = ${req.body.username}`;
    console.log(sql);
    db.query(sql, (err, result) => {
        console.log(result);
        if (result == undefined) {
            console.log('Entering insert');
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
            let user = { userid: req.body.username, password: req.body.password };
            sql = 'INSERT INTO users SET ?';
            var errFl=false;
            db.query(sql, user, (err, result) => {
                if (err) {
                    console.log("Error adding");
                    errFl = true;
                };
                if(errFl)
                    res.send("User already exists");
                else
                    res.send("User added successfully");
            });
        }
    });
})

app.listen('3001', () => {
    console.log("Started server on port 3000");
})

