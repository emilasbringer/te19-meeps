var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const meepRouter = require('./routes/meeps');

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/meeps', meepRouter);

module.exports = app;