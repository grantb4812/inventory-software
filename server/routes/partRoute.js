module.exports = function(app) {

var mongoose = require('mongoose');
var Part = require('../models/partModel.js');
var user = require('../models/userModel.js');
var User = mongoose.model('User');

app.post('/part', function(req, res) {
        console.log(req.body);
   var newPart = new Part({
      partNumber: req.body.partNumber,
      description: req.body.description,
      
   });
   
   newPart.save(function(err, newPart) {
      if (err) console.error(err);
   });
});

app.get('/part', function(req, res) {

      Part.find({}, function(err, data) {
         if (err) console.error(err);
         res.json(data);
      });
   
});

app.delete('/part', function(req, res) {
   
      Part.remove({}, function(err) {
         if (err) console.error(err);
         res.send("Delete!");
      });
});

app.get('/cyclecount', function(req, res) {
    console.log(req.body);
   var userQuery = {_id : req.session.passport.user};
   User.findOne(userQuery, function(err, user) {
       if(err) console.error(err);
       
       if(user.group == "customer") {
           Part.find({belongsTo: userQuery}, function(err, part) {
               console.log(userQuery);
               if (err) console.error(err);
               res.json(part);
           });
       } else {
           Part.find({}, function(err, part) {
               console.log('got here');
              if(err) console.error(err);
              res.json(part);
              
           });
       }
   });
   
    
});
   
   


};