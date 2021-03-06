var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//  specify Mongo database
var mongo = require('mongodb');
var monk = require('monk');

//  connection string
//var db = monk('mongodb://bcuser:bcuser@ds157599.mlab.com:57599/prog219_spring218'); //Janusz's db
var db = monk('mongodb://doug219:progdou219@ds259079.mlab.com:59079/cottrill-prog219'); //Doug's db

//  routes specific to pages
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// all necessary module use statements
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make DB accessible
app.use(function(req, res, next) {
	req.db = db;
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// returns object for further use
module.exports = app;
