var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
if (process.env.ENV == 'Test') {
	db = mongoose.connect('mongodb://localhost/trading_test');
} else {
	db = mongoose.connect('mongodb://localhost/trading');
}

var Trade = require('./src/models/tradeModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

tradeRouter = require('./src/Routes/tradeRoutes')(Trade);

app.use('/api/trades', tradeRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function() {
  console.log('Gulp is running my app on port: ' + port);
});

module.exports = app;
