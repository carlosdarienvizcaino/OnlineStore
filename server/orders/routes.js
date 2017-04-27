
var httpHandler = require('./http-handler');

var placeOrderQueueHandler = require('./place-order-queue-handler');

var creditReservedQueueHandler = require('./credit-reserved-queue-handler');

var creditLimitQueueHandler = require('./credit-limit-queue-handler');

module.exports  = function(app){

    app.get('/api/v1/orders/', function(req,res){
        httpHandler.getAllOrders(req, res);
    });

    app.get('/api/v1/orders/:id', function(req, res){
        httpHandler.getOrderById(req,res);
    });

    app.get('/api/v1/orders/customers/:id', function(req, res){
        httpHandler.getOrderByCustomerId(req,res);
    });

    placeOrderQueueHandler.initHandler();

    creditReservedQueueHandler.initHandler();

    creditLimitQueueHandler.initHandler();
};
