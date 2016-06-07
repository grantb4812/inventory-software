var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderNumberSchema = new Schema({
        orderCount: Number
    });

mongoose.model('OrderNumber', orderNumberSchema);