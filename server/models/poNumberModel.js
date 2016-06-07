var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poNumberSchema = new Schema({
        poCount: Number
    });

mongoose.model('PoNumber', poNumberSchema);