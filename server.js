var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/bild', function(req, res) {
    res.send('dsfaf');
});

app.post('/bild', function(req, res) {
    console.log(req.body);

    res.send('Server received String');
});

app.listen(3000, function() {
    console.log('Listen to Port 3000!');
});
