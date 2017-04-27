
var Order = require('./order-model');

module.exports = {
    getAllOrders : getAllOrders,
    getOrderById : getOrderById,
    getOrderByCustomerId : getOrderByCustomerId
};

function getAllOrders(req, res) {
   Order.find({}, function(err, users){

       if(err) {
           res.status(500).send(err);
       }
       else {

           res.status(200).send(users);
       }
   });
}

function getOrderById(req, res) {

    var orderId = req.params.id;
    Order.find({orderId: orderId}, function(err, order){

       if(err) {
           res.status(500).send(err);
       }
       else {
           res.status(200).send(order);
       }
   });
}

function getOrderByCustomerId(req, res) {

    var customerId = req.params.id;
    Order.find({customerId: customerId}, function(err, order){

       if(err) {
           res.status(500).send(err);
       }
       else {
           res.status(200).send(order);
       }
   });
}


