var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(urlencodedParser);
app.use(jsonParser);

app.use(express.static(process.cwd() + '/client'));

app.get('/',  function(req, res) {
   res.sendFile(process.cwd() + '/index.html'); 

});

require('./server/routes/authRoute.js')(app);
require('./server/routes/partRoute.js')(app);
require('./server/routes/userRoute.js')(app);
require('./server/routes/poRoute.js')(app);
require('./server/routes/orderRoute.js')(app);

var port = process.env.PORT || 8080;
app.listen(port, function (){
   console.log("Listening on " + port + "!"); 
});
