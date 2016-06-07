var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partSchema = new Schema({
    partNumber: Number,
    description: String,
    location: Number,
    status: String,
    quantity: Number,
    belongsTo: String
});

var Part = mongoose.model("Part", partSchema);

module.exports = Part;