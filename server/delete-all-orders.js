
var mongoose = require('mongoose');
var Orders = require('./orders/order-model');
var mongoURI = require('./app-config.json').mongo.orders;

mongoose.connect(mongoURI)
    .then( function(){
        deleteAllOrders();
    })
    .catch(function (error) {
        console.log(error);
    });


function deleteAllOrders() {
    Orders.remove({}, function(err) {
        if (err) throw err;
    });
}


