var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poSchema = new Schema({
        poNumber: Number,
        description: String,
        quantity: Number,
        status: String,
        partNumber: Number,
        location: Number,
        belongsTo: String,
        editHistory: Array
    },
    {
        timestamps: true
    }
    );

mongoose.model('Po', poSchema);