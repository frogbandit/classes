var express = require('express')//.createServer(); // 
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 
var routes = require('./routes/index');

var mongodbUri = 'mongodb://heroku_d5x2mctr:ar6kctuibnmb57crd2tv5s73kv@ds037205.mongolab.com:37205/heroku_d5x2mctr'

mongoose.connect(mongodbUri || 'mongodb://localhost/test', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected'); 
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// module.exports = app;
app.listen(process.env.PORT || 3000)