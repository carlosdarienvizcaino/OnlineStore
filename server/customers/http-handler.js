
var Customer = require('./customer-model');

module.exports = {
    getAllCustomers : getAllCustomers,
    getACustomer : getACustomer
};

function getAllCustomers(req, res) {
   Customer.find({}, function(err, users){

       if(err) {
           res.status(500).send(err);
       }
       else {

           res.status(200).send(users);
       }
   });
}

function getACustomer(req, res) {

    var customerId = req.params.id;
    Customer.find({customerId: customerId}, function(err, user){

       if(err) {
           res.status(500).send(err);
       }
       else {
           res.status(200).send(user);
       }
   });
}

