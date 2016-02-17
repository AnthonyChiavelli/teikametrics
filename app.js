// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var api = require('./api');
var model = require('./model');

// Create app
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + '/public'));

// Database
mongo.MongoClient.connect('mongodb://localhost/nodelist', function (err, db) {
    if (err) {
        console.log('Could not connect to database');
        console.log(err);
    }
    else {
        console.log('Connected to database');
        model.initModel(db);
        model.importData();
    }
});

// API
app.get('/employee/average-salary', api.averageSalaryForTitle);

// Begin listening
app.listen(3000);
