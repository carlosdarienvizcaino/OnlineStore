
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var appConfig = require('../app-config.json');

var mongoURI = require('../app-config.json').mongo.customers;
mongoose.connect(mongoURI)
    .catch(function (error) {
        console.log(error);
    });

var bodyParser = require('body-parser');

// Set port
var port = process.env.PORT || appConfig.ports["customers"];

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use(express.static('js'));

// routes
var routes = require('./routes')(app);

// Start Gateway Service at http://localhost:3002
app.listen(port, function() {
    console.log("Customers Service hosted on port " + port + " !");
});
