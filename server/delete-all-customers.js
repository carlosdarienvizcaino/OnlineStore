
var mongoose = require('mongoose');
var Customer = require('./customers/customer-model');
var mongoURI = require('./app-config.json').mongo.customers;

mongoose.connect(mongoURI)
    .then( function(){
        deleteAllCustomers();
    })
    .catch(function (error) {
        console.log(error);
    });


function deleteAllCustomers() {
    Customer.remove({}, function(err) {
        if (err) throw err;
    });
}



