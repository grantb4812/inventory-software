module.exports = function(app) {
 
    var passport = require('passport');
    var mongoose = require('mongoose');
    var LocalStrategy = require('passport-local').Strategy;
 
 
    var user = require('../models/userModel.js');
    var User = mongoose.model('User');
 
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);
 
    app.use(session({
        store: new MongoStore({
            url: 'mongodb://localhost/test'
         }),
        secret: 'secret',
        resave:true,
        saveUninitialized:true
    }));
 
    app.use(passport.initialize());
 
    app.use(passport.session());
 
 
    passport.use(new LocalStrategy(
        function (username, password, done) {
 
            User.findOne({username: username}, function (err, user) {
 
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {alert: 'Incorrect username.'});
                }
                if (user.password != password) {
                    return done(null, false, {alert: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
 
    ));
 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
 
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
             done(err, user);
        });
    });
 
    function isAuthenticated(req,res,next){
        if(req.isAuthenticated())return next();
         res.sendStatus(401);
    }
 
 
    app.post('/login', passport.authenticate('local'), function(req, res){
        res.json(req.user);
    });
 
 
    app.get('/currentuser', isAuthenticated, function(req,res){
        res.json(
            {
                firstname: req.user.firstname,
                company: req.user.company,
                authorization: req.user.authorization
            }
        );
    });
 
   
     app.get('/logout', function(req, res){
         console.log('logout');
        req.logout();
        res.sendStatus(200);
     });
 
};