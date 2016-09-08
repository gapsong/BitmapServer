var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs'),
    url = require('url');
var jsonBild;
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://fuckyou:yoo@ds021016.mlab.com:21016/killanova';
var database;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    database = db;
    insertDocuments(db, function() {
        findDocuments(db, function() {
            db.close();
        });
    });
});

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([{
        a: "Rene Stinkt"
    }, {
        a: 2
    }, {
        a: 3
    }], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}


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
    findDocuments(databse, function() {
        console.log("sdfa");
    });
});

//sends the Bitmap as a String on a GET request
app.get('/bild', function(req, res) {
    //deletes the old reference to the json
    delete require.cache[require.resolve('./public/bild.json')]
    jsonBild = require('./public/bild.json')
    res.send(jsonBild.bild);
});

app.get('/test', function(req, res) {
    insertDocuments()
    res.send('geht');
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
