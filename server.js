var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs'),
    url = require('url');

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json({
    limit: '5 mb' //max. size
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '5mb' //max. size
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/bild', function(req, res) {
    res.send('dsfaf');
});

app.post('/bild', function(req, res) {
    console.log(req.body.bild);
    fs.writeFile(__dirname + '/public/data.js',
        "var data = " + JSON.stringify({
            bild: new String(req.body.bild)
        })
    );
    res.send('Server received String');
});

app.listen(3000, function() {
    console.log('Listen to Port 3000!');
});
