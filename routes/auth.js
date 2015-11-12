var express = require("express");
var router = express.Router();

// Login page
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login Page'});
});

// Login request
router.post('/login', function(req, res, next) {
  // post 所傳送的參數 => req.body
  console.log(req.body);

  // 驗證帳號密碼是否存在
  if(req.body.username && req.body.password) {
    // 做帳密驗證

    // 轉址到登入完成畫面 (301 為轉址的 status code)
    res.redirect(301, '/');
  } else {
    // res.json({
    //   status: 'error',
    //   description: 'Without some params.',
    //   data: []
    // });
    res.redirect(301, '/auth/login');
  }
});

module.exports = router;
