
var express = require('express');
var app = express();
var appConfig = require('../app-config.json');

var bodyParser = require('body-parser');

// Set port
var port = process.env.PORT || appConfig.ports["gateway"];

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use(express.static('client'));

var routes = require('./routes')(app);

app.listen(port, function() {
    console.log("Gateway Service hosted on port " + port + " !");
});
