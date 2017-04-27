
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({

    orderId: {type: String, require: true, unique: true},

    customerId: {type: String, require: true},

    itemNames: {type: Array},

    purchaseDate: {type: Date},

    total: {type: Number, require: true},

    status: {type: String, require: true}

});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;