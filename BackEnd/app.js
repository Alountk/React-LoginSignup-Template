require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);


mongoose
  .connect(`mongodb://localhost/${process.env.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const privateRouter = require('./routes/private');

const app = express();

// Middleware Setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Login',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.cart = req.session.cart;
    res.locals.totalItems = req.session.totalItems;
    res.locals.totalPrice = req.session.totalPrice;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }
  next();
});



app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/private', privateRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;