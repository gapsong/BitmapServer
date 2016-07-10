var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs'),
    url = require('url');
var jsonBild;

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

//sends the Bitmap as a String on a GET request
app.get('/bild', function(req, res) {
  //deletes the old reference to the json
  delete require.cache[require.resolve('./public/bild.json')]
  jsonBild = require('./public/bild.json')
  res.send(jsonBild.bild);
});

app.post('/test', function(req, res) {
    res.send('Server received String');
});

// gets a picture and saves it as a String in .js; .json
app.post('/bild', function(req, res) {
    fs.writeFile(__dirname + '/public/data.js',
        "var data = " + JSON.stringify({
            bild: new String(req.body.bild)
        })
    );
    fs.writeFile(__dirname + '/public/bild.json',
        JSON.stringify({
            bild: new String(req.body.bild)
        })
    );
    res.send('Server received String');
});

app.listen(3000, function() {
    console.log('Listen to Port 3000!');
});
