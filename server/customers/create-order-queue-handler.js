
var rabbitMQ = require('../rabbit-mq/rabbitmq-client');
var amqp = require('amqplib/callback_api');
var amqpURL = require('../app-config.json').rabbitmq.connection.url;
var Customer = require('./customer-model');

var createOrderQueueName =
    require('../app-config.json').rabbitmq.queues.createOrders;

var creditLimitExceedQueueName =
    require('../app-config.json').rabbitmq.queues.creditLimitExceed;

var creditReservedQueueName =
    require('../app-config.json').rabbitmq.queues.creditReserved;


module.exports = {
    initHandler: initHandler
};

function initHandler() {
    amqp.connect(amqpURL, function(err, connection){

        if (err) throw err;

        connection.createChannel(function(err, channel){

            if (err) throw err;

            channel.assertQueue(createOrderQueueName, {durable:true});

            channel.prefetch(1);

            channel.consume(createOrderQueueName, function(msg){

                console.log("***Consuming CreateOrderQueue message***");
                console.log(msg.content.toString());

                checkOrderCreditLimit(msg.content.toString());

                channel.ack(msg);

            },{noAck: false});
        });
    });
}

function checkOrderCreditLimit(msg) {
    msg = JSON.parse(msg);

    var orderTotal = msg.total;
    var customerId = msg.customerId;

    Customer.find({customerId: customerId}, function(err, user){

        if(err) throw err;

        user = user[0];
        console.log(user);

        if ( user.credit < orderTotal ) {
            sendCreditLimitExceededQueueMessage(msg);
        }
        else {

            console.log("creditssssss");
            console.log(user.credit);
            console.log(orderTotal);
            Customer.findOneAndUpdate( {customerId: customerId}, {credit: user.credit - orderTotal})
                .then( data =>{
                    sendCreditReservedQueueMessage(msg);
                });
        }

    });
}

function sendCreditLimitExceededQueueMessage(orderData) {

    var msg = {};
    msg.eventName = "CreditLimitExceed";
    msg.customerId = orderData.customerId;
    msg.orderId = orderData.orderId;

    msg = JSON.stringify(msg);
    console.log(msg);

    rabbitMQ.registerAsPublisher(creditLimitExceedQueueName)
    .then(function(channel){
        channel.sendToQueue(creditLimitExceedQueueName, Buffer.from(msg));
    })
    .catch(function(error){
        console.log(error) ;
    });
}

function sendCreditReservedQueueMessage(orderData) {

    var msg = {};
    msg.eventName = "CreditReserved";
    msg.customerId = orderData.customerId;
    msg.orderId = orderData.orderId;

    msg = JSON.stringify(msg);
    console.log(msg);

    rabbitMQ.registerAsPublisher(creditReservedQueueName)
    .then(function(channel){
        channel.sendToQueue(creditReservedQueueName, Buffer.from(msg));
    })
    .catch(function(error){
        console.log(error) ;
    });
}


