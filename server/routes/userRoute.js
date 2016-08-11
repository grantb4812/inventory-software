module.exports = function(app) {
    
    var mongoose = require('mongoose');
    
    var user = require('../models/userModel.js');
    var User = mongoose.model('User');   
    
    
   app.post('/createUser',function(req,res){
       console.log(req.body._id);
      if (req.body._id) {
        User.findOne({_id: req.body._id}, function(err, user) {
            if (err) console.error(err);
            console.log(user);
            if (user.authorization == 'administrator') {
                
                var u =  new User();
                u.username = req.body.username;
                u.password = req.body.password;
                u.company = req.body.company;
                u.authorization = req.body.authorization;
                u.firstname = req.body.firstname;
                u.lastname = req.body.lastname;
                u.group = 'internal';
        
                 u.save(function(err){
                    if (err) {
                        res.json({'alert':'Registration error'});
                    }else{
                        res.json({'alert':'Registration success'});
                        console.log(u);
                    }
            });
          }
        }); 
        } else {
                console.log('created customer');
                var u =  new User();
                u.username = req.body.username;
                u.password = req.body.password;
                u.company = req.body.company;
                u.authorization = 'customer';
                u.firstname = req.body.firstname;
                u.lastname = req.body.lastname;
                u.group = 'customer';
        
                u.save(function(err){
                    if (err) {
                        res.json({'alert':'Registration error'});
                    }else{
                        res.json({'alert':'Registration success'});
                }
            });
        }
        
        
    });
    
    app.get('/searchUser', function(req,res) {
            console.log(req.query);
            var query = req.query;
            User.find(query, function(err, all) {
                if (err) console.error(err);
                res.json(all);
        });
        
    });
    
   
    
    app.put('/editUser', function(req, res) {
        console.log(req.body);
        console.log(req.body._id);
        var userLookup = {_id: req.body._id};
        var update = {$set: req.body};
        //console.log(req.query);
        User.update(userLookup, update, function(err){
            if (err) console.error(err);
            
            res.json({alert: "Seccussful Edit"});
        });
          
    });
    
    app.delete('/deleteUser', function(req, res) {
           User.remove({
                _id: req.query._id
            }, function(err, user) {
                if (err) {
                    console.error(err);
                } else {
                    res.json({'alert': 'Successfully Deleted!'});
                }
            }
            
            );
          
    });
};