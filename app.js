var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var config = require('./config');

//initialize mongoose schemas
require('./models/model');

var index = require('./routes/index');
var api = require('./routes/api');

//create the app
var app = express();

//build the connection string 
var dbURI = config.dbURI;

// create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// when successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// if the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// when the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// if the node process ends, close the mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
//CONNECTION EVENTS END

//MIDDLEWARES=============================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js',express.static(__dirname + '/public/js/'));
app.use('/modules',express.static(__dirname + '/node_modules/'));

var port = process.env.PORT || 3000;        // set our port

// REGISTER OUR ROUTES -------------------------------
app.use('/', index);
// all of our routes will be prefixed with /phonebook
app.use('/phonebook', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).send(err.message);
});

//END MIDDLEWARES==========================================
module.exports = app;
