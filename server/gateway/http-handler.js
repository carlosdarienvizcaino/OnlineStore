
var axios = require('axios');

var customersPort = require('../app-config.json').ports.customers;
var ordersPort = require('../app-config.json').ports.orders;

module.exports = {
    getCustomer : getCustomer,
    getOrders : getOrders
};

function getCustomer(req, res) {

    console.log("From Gateway: Getting Customer");
    var url = `http://localhost:${customersPort}/api/v1/customers/${req.params.id}`;
    axios.get(url)
    .then(function(response){
        res.status(response.status).send(response.data);
    })
    .catch(function(error){
        console.log(error);
        res.status(error.status).send(error.statusText);
    });
}

function getOrders(req, res) {

    console.log("From Gateway: Getting Customer");
    var url = `http://localhost:${ordersPort}/api/v1/orders/customers/${req.params.id}`;
    axios.get(url)
    .then(function(response){
        res.status(response.status).send(response.data);
    })
    .catch(function(error){
        console.log(error);
        res.status(error.status).send(error.statusText);
    });
}









