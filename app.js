var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const PORT = process.env.NODE_PORT || 3000;

var envFile = require('node-env-file');

try {
  envFile(path.join(__dirname, 'config/development.env' ))
} catch(e){

}
var connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`;
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect(connectionString, options);


var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');

var app = express();
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if(req.path === '/users/signin' || req.path === '/users/signup'){
    return next();
  }
  var token = req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.json({ message: 'Failed to authenticate token.' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }else {
    return res.status(403).send({
        message: 'No token provided.'
    });
  }
});

app.use('/', routes);
app.use('/users', users);
app.use('/products', products);

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
    console.log(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
});

app.listen(PORT,process.env.NODE_IP || 'localhost', function () {
  console.log(`Express app is up and running on ${PORT}`);
});

module.exports = app;
