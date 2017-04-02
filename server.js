const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

app.use(BodyParser.json());

MongoClient.connect(db.url, function (err, database) {
    if (err) {
        return console.log(err);
    }
    require('./app/routes')(app, database);
    app.listen(port, function() {
        console.log('We are running on ' + port);
        app.use(express.static(__dirname + '/public'));
    });
});