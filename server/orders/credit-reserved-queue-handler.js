

var amqp = require('amqplib/callback_api');
var amqpURL = require('../app-config.json').rabbitmq.connection.url;
var Orders = require('./order-model');

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

            channel.assertQueue(creditReservedQueueName, {durable:true});

            channel.prefetch(1);

            channel.consume(creditReservedQueueName, function(msg){

                console.log("***Consuming CreditReserved Queue message***");
                console.log(msg.content.toString());

                updateOrderStatus(msg.content.toString())
                    .then( data => {
                        channel.ack(msg);
                    })
                    .catch(err =>{
                        console.log(err);
                    });

            },{noAck: false});
        });
    });
}

function updateOrderStatus(msg) {
   var orderData = JSON.parse(msg);
   return Orders.findOneAndUpdate( {orderId : orderData.orderId}, {status : "APPROVED"});
}



