var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

/**
 * uuid: https://github.com/broofa/node-uuid
 * uuid.v1(): 以時間為依據的 uuid (所以保證不衝突)
 * uuid.v4(); 以隨機數為依據的 uuid
 */
var uuid = require('node-uuid');

// routers
var routes = require('./routes/index');
var users = require('./routes/users');
var auths = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * use session, the genid will be generate by time based uuid.
 * 之後可以從 req.session 取得 session.
 * e.g.:
 * 	set auth = true
 * 	req.session.auth = true;
 *
 * 	get auth
 * 	var isLogin = req.session.auth;
 */
app.use(session({
  genid: function(req) {
    return uuid.v1() // use time-based UUIDs for session IDs
  },
  resave: false,
  saveUninitialized: true,
  secret: 'Cat Meow~Meow~'
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use 會由上往下依序執行
// 驗證是否已經登入的中間層 (middleware)
function isLogin(req, res, next) {
  console.log('Enter', req.path);
  console.log('Session', req.session);

  // 假設路徑為 /create 且為 POST 方法或已經登入，則 pass
  // 排除特定路徑，可寫進 middleware 判斷
  if(req.session.auth || (req.path === '/create' & req.method === 'POST')) {
    // 有登入，就往下執行，所以直接呼叫 next 方法就好
    next();
  } else {
    // session.auth 不存在或為否，則先設定 session.auth = false，之後直接導到登入畫面
    req.session.auth = false;
    console.log('redirect');
    // next();
    res.redirect(301, '/auth/login');
  }
}

/**
 * 設定哪些 routers 要經過 middleware，"*" 表示全部 routers 都要經過
 * routers 可以吃陣列，一次設定多個，而且可以寫正規表示式
 * 這邊要額外設定 /users 的原因是因為 express 判斷 /users/ 會 match 進入 middleware，但 /users 不 match
 */
// app.use(['/users/*'], isLogin);

app.use('/', routes);
// middleware 也可以直接插在中間
app.use('/users', isLogin, users);
app.use('/auth', auths);

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


module.exports = app;
