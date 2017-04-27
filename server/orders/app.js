
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var mongoURI = require('../app-config.json').mongo.orders;
mongoose.connect(mongoURI)
    .catch(function (error) {
        console.log(error);
    });

var appConfig = require('../app-config.json');

var bodyParser = require('body-parser');

// Set port
var port = process.env.PORT || appConfig.ports["orders"];

app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use(express.static('js'));

// routes
var routes = require('./routes')(app);

app.listen(port, function() {
    console.log("Orders Service hosted on port " + port + " !");
});
