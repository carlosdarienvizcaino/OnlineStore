
var httpHandler = require('./http-handler');
var customerQueueHandler = require('./create-customer-queue-handler');
var orderQueueHandler = require('./create-order-queue-handler');

module.exports  = function(app){

    app.get('/api/v1/customers/:id', function(req,res){
        httpHandler.getACustomer(req, res);
    });

    app.get('/api/v1/customers', function(req,res){
        httpHandler.getAllCustomers(req, res);
    });

    customerQueueHandler.initHandler();

    orderQueueHandler.initHandler();
};
