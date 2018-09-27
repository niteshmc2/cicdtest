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

app.route('/time').get(verify, (req,res)=>{
    console.log(req.query);
    let sql = `SELECT * FROM users WHERE userid = ${req.params.username}`;
    db.query(sql, (err, result)=>{
        if(err) {
            console.log("User not found");
            return;
        }
        console.log(result);
        if (bcrypt.compareSync(req.body.password, result.password)) {
            res.status(200).send("Logged in "+Date.now());
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

