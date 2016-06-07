var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
 
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    authorization: {
        type: String,
        trim: true  // administrator / shipper / receiver / buyer
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    group: {
        type: String,
        trim: true
    }
});
 
mongoose.model('User', UserSchema);