const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.route('/').get(function (req, res) {
    res.send('Basic auth app')
});


let initApp = require('./api/app');
initApp(app);

app.listen('3001', () => {
    console.log("Started server on port 3001");
})

