var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('validator');

var index = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'sess_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge:36000000,expires:false }
}))

app.use(function(req,res,next){
  if(req.session && req.session.user_name){
    res.app.locals.user_id = req.session.user_id;
    res.app.locals.user_name = req.session.user_name;
    res.app.locals.user_email = req.session.user_email;
    res.app.locals.user_mobile = req.session.user_mobile;

    next();
  }else{
    delete res.app.locals.user_id;
    delete res.app.locals.user_name;
    delete res.app.locals.user_email;
    delete res.app.locals.user_mobile;
    
    next();
  }
})


app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', index);
app.use('/users', users);
app.use('/category', category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
