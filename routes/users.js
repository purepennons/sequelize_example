var express = require('express');
var db      = require('../model/db');
var router = express.Router();

// 讀出全部 Users 資料
router.get('/', function(req, res, next) {
  db.User.findAll()
  .then(function(users) {
    // console.log(users[0].dataValues);
    res.json({
      status: 'success',
      description: 'query all users',
      data: users
    });
  })
  .catch(function(err) {
    res.json({
      status: 'error',
      description: 'something wrong when querying all users.',
      data: []
    });
  });
});

// 新增 User
router.post('/create', function(req, res, next) {
  var user = {
    user_id: req.body.user_id,
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    Gender: req.body.Gender,
    joinDate: new Date()
  };

  // insert a user
  db.User.create(user)
  .then( () => { // es6 語法，等價於 function，偷懶可以這樣寫
    console.log('create a user');
    res.json({
      status: 'success',
      description: 'create a user',
      data: []
    });
  })
  .catch( err => {
    res.json({
      status: 'error',
      description: 'something wrong when inserting a user.',
      data: []
    });
  });
});

module.exports = router;
