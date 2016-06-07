module.exports = function(app) {
    
    var mongoose = require('mongoose');
    var order = require('../models/orderModel.js');
    var Order = mongoose.model('Order');
    var orderCount = require('../models/orderNumberModel.js');
    var OrderCount = mongoose.model('OrderNumber');
    var part = require('../models/partModel.js');
    var Part = mongoose.model('Part');
    var User = mongoose.model('User');
    
    app.post('/createOrder', function(req, res) {
        OrderCount.findOne({}, function(err, count, newCount) {
            if(err) console.error(err);
            if (count) {
                var id = {};
                var num = {$inc: {orderCount: +1}}; 
                OrderCount.update(id, num, function(err) {
                    if (err) console.error(err);
                    newCount = count.orderCount;
                    createOrder(newCount, req.body);
                });
            } else {
                var oc = new OrderCount();
                oc.orderCount = 1; 
                oc.save(function(err, count) {
                    if (err) console.error(err);
                });
                newCount = count.orderCount;
                createOrder(newCount, req.body);
            }
        });
        
        var createOrder = function(num, part) {
            Part.findOne({partNumber: part.partnumber}, function(err, qty) {
                if (err) console.log(err);
                
            
                if(part.qty <= qty.quantity) {
                    var order = new Order();
                    order.orderNumber = num;
                    order.partNumber = req.body.partnumber;
                    order.description = req.body.description;
                    order.quantity = req.body.qty;
                    order.status = 'Awaiting Shipping';
                    order.shipTo = req.body.ship;
                    order.belongsTo = req.session.passport.user;
                    
                    order.save(function(err) {
                        if (err) console.error(err);
                        res.json({alert: 'order created'});
                    });
                    
                    
                    var newQty = qty.quantity - part.qty;
                    var id = {_id: qty._id};
                    var up = {$set: {quantity: newQty}};
                    Part.update(id, up, function(err, part) {
                        if(err) console.error(err);
                    });
                    
                } else {
                    res.json({alert:"Not enough inventory!"});
                }
            });
            
        };    
    });    
    
    
    app.get('/getOrder', function(req,res) {
        console.log(req.body);
            
        var userQuery = {_id: req.session.passport.user}; 
        if (req.query.orderNumber) {
            var orderQuery = {orderNumber: req.query.orderNumber};
        } else {
             orderQuery = {};
        }
        User.findOne(userQuery, function(err, user) {
            if(err) console.error(err);
            if(user.group == 'customer') {
                //find po's with special customer id
                Order.find({belongsTo: userQuery}, function(err, order) {
                   if(err) console.error(err);
                    res.json(order);
               });
            } else {
                Order.find(orderQuery, function (err, order) {
                    if(err) console.error(err);
                    res.json(order);
                });
            }
            
        });
    });
    
    app.put('/editOrder', function(req, res) {
        console.log(req.body);
        if(req.body.tracking) {
            req.body.status = 'shipped';
        }    
       var orderLookup = {_id: req.body._id};
       var update = {$set: req.body};
       
       Order.update(orderLookup, update, function(err) {
          if (err) res.json({alert: 'Unsuccessful edit!'});
          res.json({alert: 'Edit successful!'});
       });
    });
    
    app.delete('/deleteOrder', function(req, res) {
        console.log(req.query._id);
        Order.remove({
            _id: req.query._id
        }, function(err, order) {
            if (err) {
                res.json({alert: "Order Deletion Unsuccessfull!"});
            } else {
                res.json({alert: "Order Deleted!"});
            }
        });  
    }); 
    
};


    