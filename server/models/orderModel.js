var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
        orderNumber: Number,
        description: String,
        quantity: Number,
        status: String,
        partNumber: Number,
        shipTo: String,
        tracking: Number,
        belongsTo: String
    },
    {
        timestamps: true
    }
    );

mongoose.model('Order', orderSchema);