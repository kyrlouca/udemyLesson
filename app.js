var express = require('express');
var path = require('path');
// var keys = require('./config/keys');
var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20');
require('./config/initPassportStrategy')(passport);

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var myIndex = require('./routes/myIndex');
var users = require('./routes/users');
var authUser = require('./routes/authUser');
var authCallback = require('./routes/authGoogleCallback');

// require('./config/initPassportStrategy');
// var authUser = require('./routes/authUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/myIndex', myIndex);

app.use('/auth/google/callback', authCallback);
// app.use('/auth/user',authUser);

/* passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleId,
      clientSecret: keys.googleSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken) => {
      console.log(accessToken);
    }
  )
);
 */

// app.use('/auth/user', authUser(passport));
app.get(
  '/auth/user',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
