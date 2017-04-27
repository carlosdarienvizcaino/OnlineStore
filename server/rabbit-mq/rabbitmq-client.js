

var amqp = require('amqplib/callback_api');
var amqpURL = require('../app-config.json').rabbitmq.connection.url;

function registerAsSubscriber(queueName) {
   return new Promise(function(resolve, reject){
       amqp.connect(amqpURL, function(err, connection){

           if (err) reject(err);
            connection.createChannel(function(err, channel){

                if (err) reject(err);

                channel.assertQueue(queueName, {durable:true});

                channel.prefetch(1);

                channel.consume(queueName, function(msg){
                    console.log("Consuming message");
                    console.log(msg.content.toString());
                    resolve(msg.content.toString());
                    channel.ack(msg);
                },{noAck: false});
            });
        });
   });
}


function registerAsPublisher(queueName){
   return new Promise (function(resolve, reject){
       amqp.connect(amqpURL, function(err, connection){

            if (err) reject(err);
            connection.createChannel(function(err, channel){

                if (err) reject(err);
                channel.assertQueue(queueName, {durable:true});

                resolve(channel);

                });
            });

        });
}

module.exports  = {
    registerAsSubscriber : registerAsSubscriber,
    registerAsPublisher  : registerAsPublisher
};
