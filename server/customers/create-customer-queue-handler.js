
var amqp = require('amqplib/callback_api');
var amqpURL = require('../app-config.json').rabbitmq.connection.url;
var Customer = require('./customer-model');

var createCustomerQueueName =
    require('../app-config.json').rabbitmq.queues.createCustomers;

module.exports = {
    initHandler: initHandler
};

function initHandler() {
    amqp.connect(amqpURL, function(err, connection){

        if (err) throw err;

        connection.createChannel(function(err, channel){

            if (err) throw err;

            channel.assertQueue(createCustomerQueueName, {durable:true});

            channel.prefetch(1);

            channel.consume(createCustomerQueueName, function(msg){

                console.log("***Consuming message***");
                console.log(msg.content.toString());

                saveCustomerToDB(msg.content.toString());

                channel.ack(msg);

            },{noAck: false});
        });
    });
}

function saveCustomerToDB(msg) {
    msg = JSON.parse(msg);
    var newCustomer = new Customer({
        customerId : msg.customerId,
        firstName : msg.firstName,
        lastName : msg.lastName,
        credit: msg.credit
    });

    newCustomer.save(function(err){
        if(err) {
            console.log(err);
        }
        else {
            console.log("Customer data saved");
        }
    });
}

