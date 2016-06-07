module.exports = function(app) {
    
    var mongoose = require('mongoose');
    var po = require('../models/poModel.js');
    var Po = mongoose.model('Po');
    var poCount = require('../models/poNumberModel.js');
    var PoCount = mongoose.model('PoNumber');
    var part = require('../models/partModel.js');
    var Part = mongoose.model('Part');
    var user = require('../models/userModel.js');
    var User = mongoose.model('User');
    
    
    app.post('/createPo', function(req, res) {
          PoCount.findOne({}, function(err, count, newCount) {
            if(err) console.error(err);
            if (count) {
                var id = {};
                var num = {$inc: {poCount: +1}}; 
                PoCount.update(id, num, function(err) {
                    if (err) console.error(err);
                    newCount = count.poCount;
                    console.log(req.body);
                    createPo(newCount);
                });
            } else {
                var pc = new PoCount();
                pc.poCount = 1; 
                pc.save(function(err, count) {
                    if (err) console.error(err);
                });
                newCount = count.poCount;
                createPo(newCount);
            }
        });
     var createPo = function(newNum){
         // need id to identify customer or internal user
         // need to work on id # being generated from user
        var po = new Po();
        po.poNumber = newNum;
        po.partNumber = req.body.partnumber;
        po.description = req.body.description;
        po.quantity = req.body.qty;
        po.status = 'Incoming';
        po.belongsTo = req.session.passport.user;
        
        po.save(function(err, po) {
            if (err) {
                res.json({'alert': 'PO creation failed!'});
            } else {
                res.json({'alert': 'PO creation success!'});
            }
        });
       };
    });
    
    app.get('/getPo', function(req, res) {
        var userQuery = {_id: req.session.passport.user}; 
        if (req.query.poNumber) {
            var poQuery = {poNumber: req.query.poNumber};
        } else {
             poQuery = {};
        }
        User.findOne(userQuery, function(err, user) {
            if(err) console.error(err);
            if(user.group == 'customer') {
                //find po's with special customer id
                Po.find({belongsTo: userQuery}, function(err, po) {
                   if(err) console.error(err);
                    res.json(po);
               });
            } else {
                Po.find(poQuery, function (err, po) {
                    if(err) console.error(err);
                    res.json(po);
                });
            }
            
        });
    });    
            
    
    app.put('/editPo', function(req, res) {
        console.log(req.body);
       var poLookup = {_id: req.body._id};
       var update = {
           $set: req.body
           
       };
       
       Po.update(poLookup, update, function(err) {
          if (err) res.json({alert: 'Unsuccessful edit!'});
          res.json({alert: 'Edit successful!'});
       });
    });
    
    app.delete('/deletePo', function(req, res) {
        console.log(req.query._id);
        Po.remove({
            _id: req.query._id
        }, function(err, po) {
            if (err) {
                res.json({alert: "PO Deletion Unsuccessfull!"});
            } else {
                res.json({alert: "PO Deleted!"});
            }
        });  
    }); 
    
    app.put('/receivePo', function(req, res) {
       console.log(req.body);
       var poLookup = {_id: req.body._id};
       Po.findOne(poLookup, function(err, po) {
           if (err) console.error(err);
           if(req.body.quantity < po.quantity) {
               
               req.body.status = "partial";
               req.body.quantity = po.quantity - req.body.quantity;
               var update = {$set: req.body};
               console.log(req.body);
               Po.update(poLookup, update, function(err) {
                   if (err) console.error(err);
                    res.json({alert: 'partial receipt'});
               });
               
           }
           if (req.body.quantity == po.quantity) {
               req.body.status = "received";
               req.body.quantity = po.quantity - req.body.quantity;
               update = {$set: req.body};
               Po.update(poLookup, update, function(err) {
                   if (err) console.error(err);
                   res.json({alert: 'full receipt'});
               });
           }
       });
       
                var part = new Part();
               part.partNumber = req.body.partNumber;
               part.status = 'available';
               part.description = req.body.description;
               part.quantity = req.body.quantity;
               part.location = req.body.location;
               part.belongsTo = req.body.belongsTo;
               
               part.save(function(err) {
                   if(err) console.error(err);
                   console.log('created part!');
               });
               
       
       
    });
    
   
    app.get('/getPart', function(req,res) {
            var partQuery = req.query;
            Part.find( partQuery, function (err, po) {
                if(err) console.error(err);
                res.json(po);
            }); 
    });
    
    app.put('/changePart', function(req, res) {
       var partLookup = {_id: req.body._id};
       var update = {$set: req.body};
       console.log(req.body._id);
       Part.update(partLookup, update, function(err) {
          if (err) console.error(err);
          res.json({alert: 'Successful Transaction!'});
       });
    });
    
    app.delete('/removePart', function(req, res) {
        console.log(req.query._id);
        Part.remove({
            _id: req.query._id
        }, function(err) {
            if (err) {
                res.json({alert: "Part not removed!"});
            } else {
                res.json({alert: "Part Removed!"});
            }
        });  
    }); 
    
    
};