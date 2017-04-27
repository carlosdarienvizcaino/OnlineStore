
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({

    customerId: {type: String, require: true, unique: true},

    firstName: {type: String, require: true},

    lastName: {type: String, require: true},

    credit: {type: Number, require: true}

});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;