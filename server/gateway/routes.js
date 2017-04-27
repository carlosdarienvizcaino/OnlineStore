
var path = require('path');
var httpHandler = require('./http-handler');
var rabbitMQHandler = require('./rabbitmq-handler');

module.exports  = function(app){

    app.get('/api/v1/customers/:id', function(req,res){
        httpHandler.getCustomer(req, res);
    });

    app.post('/api/v1/customers', function(req, res){
        rabbitMQHandler.createCustomer(req,res);
    });

    app.get('/api/v1/orders/customers/:id', function(req,res){
        httpHandler.getOrders(req, res);
    });

    app.post('/api/v1/orders', function(req, res){
        rabbitMQHandler.createOrders(req, res);
    });

    app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(__dirname + "/../../client/index.html"));
    });
};
