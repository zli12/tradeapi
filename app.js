var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test')
	db = mongoose.connect('mongodb://localhost/bookAPI_test');
else
	db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./src/models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

bookRouter = require('./src/Routes/bookRoutes')(Book);
// authorRouter = require('./Routes/authorRoutes')();

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function() {
  console.log('Gulp is running my app on port: ' + port);
});

module.exports = app;
