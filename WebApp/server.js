const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        // "https://gentle-castle-56532.herokuapp.com");
   "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.route('/').get(function (req, res) {
    res.send('Basic auth app');
});


let initApp = require('./api/app');
initApp(app);

app.listen('3001', () => {
    console.log("Started server on port 3001");
})
