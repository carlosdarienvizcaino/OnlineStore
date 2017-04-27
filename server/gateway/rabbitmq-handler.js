
var uuid = require('uuid');
var rabbitMQ = require('../rabbit-mq/rabbitmq-client');

var placeOrderQueueName = require('../app-config.json').rabbitmq.queues.placeOrders;
var createCustomersQueueName = require('../app-config.json').rabbitmq.queues.createCustomers;

module.exports = {
    createCustomer : createCustomer,

    createOrders : createOrder,
};

function createCustomer(req, res){

    console.log("From Gateway: Creating Customer");
    console.log(req.body);
    var id = uuid.v1();

    sendCustomerToMessagingQueue(id, req.body);

    var CREATED = 201;
    res.status(CREATED).send({ status: "CREATED", customerId : id});
}

function createOrder(req, res){

    console.log("From Gateway: Creating Orders");
    var id = uuid.v1();
    console.log(req.body);

    sendOrderToMessagingQueue(id, req.body);

    var CREATED = 201;
    res.status(CREATED).send({ status: "CREATED", orderId: id});
}

function sendCustomerToMessagingQueue(customerId, customerData) {

    var msg = {};
    msg.eventName = "CreateCustomer";
    msg.customerId = customerId;
    msg.firstName = customerData.firstName;
    msg.lastName = customerData.lastName;
    msg.credit = customerData.credit;

    msg = JSON.stringify(msg);
    console.log(msg);

    rabbitMQ.registerAsPublisher(createCustomersQueueName)
    .then(function(channel){
        channel.sendToQueue(createCustomersQueueName, Buffer.from(msg));
    })
    .catch(function(error){
        console.log(error) ;
    });
}

function sendOrderToMessagingQueue(orderId, orderData) {

    var msg = {};
    msg.eventName = "PlaceOrder";
    msg.customerId = orderData.customerId;
    msg.orderId = orderId;
    msg.itemNames = orderData.itemNames;
    msg.total = orderData.total;

    msg = JSON.stringify(msg);
    console.log(msg);

    rabbitMQ.registerAsPublisher(placeOrderQueueName)
    .then(function(channel){
        channel.sendToQueue(placeOrderQueueName, Buffer.from(msg));
    })
    .catch(function(error){
        console.log(error) ;
    });
}
