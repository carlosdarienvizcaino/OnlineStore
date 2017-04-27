

var amqp = require('amqplib/callback_api');
var amqpURL = require('../app-config.json').rabbitmq.connection.url;
var rabbitMQ = require('../rabbit-mq/rabbitmq-client');
var Orders = require('./order-model');

var placeOrderQueueName =
    require('../app-config.json').rabbitmq.queues.placeOrders;

var createOrderQueueName =
    require('../app-config.json').rabbitmq.queues.createOrders;


module.exports = {
    initHandler: initHandler
};

function initHandler() {
    amqp.connect(amqpURL, function(err, connection){

        if (err) throw err;

        connection.createChannel(function(err, channel){

            if (err) throw err;

            channel.assertQueue(placeOrderQueueName, {durable:true});

            channel.prefetch(1);

            channel.consume(placeOrderQueueName, function(msg){

                console.log("***Consuming PlaceOrder Queue message***");
                console.log(msg.content.toString());

                saveOrderInDB(msg.content.toString())
                    .then( data => {

                        channel.ack(msg);
                        sendCreateOrderMessageToQueue(msg.content.toString());
                    })
                    .catch(err =>{
                        console.log(err);
                    });

            },{noAck: false});
        });
    });
}

function saveOrderInDB(msg) {

    var msg = JSON.parse(msg);
    var newOrder = new Orders({
        orderId: msg.orderId,
        customerId: msg.customerId,
        itemNames: msg.itemNames,
        total: msg.total,
        status: "PLACED"
    });

   return newOrder.save();
}

function sendCreateOrderMessageToQueue(orderData) {

    orderData = JSON.parse(orderData);
    var msg = {};
    msg.eventName = "OrderCreated";
    msg.customerId = orderData.customerId;
    msg.orderId = orderData.orderId;
    msg.total= orderData.total;

    msg = JSON.stringify(msg);
    console.log("*** Out message to CreateOrderQueue ***");
    console.log(msg);

    rabbitMQ.registerAsPublisher(createOrderQueueName)
    .then(function(channel){
        channel.sendToQueue(createOrderQueueName, Buffer.from(msg));
    })
    .catch(function(error){
        console.log(error) ;
    });
}

