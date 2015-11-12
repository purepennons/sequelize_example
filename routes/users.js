var express = require('express');
var db      = require('../model/db');
var router = express.Router();

// 讀出全部 Users 資料
router.get('/', function(req, res, next) {

  /**
   * 支援原生 SQL 指令：
   * db.sequelize.query('SELECT id, username, password, createdAt, updatedAt FROM Users AS User').then(function(users) {}).catch();
   */
  db.User.findAll()
  .then(function(users) {
    // result stringify 後，可以省略多餘的資料，只保留查詢結果
    // console.log(user[0].dataValues);
    console.log(JSON.stringify(users));
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

// 查詢特定 User ，並返回 html 頁面
router.get('/:username', function(req, res, next) {
  // req.params 可以取到 url 上的變數
  var username = req.params.username;
  console.log(username);
  db.User.findOne({
    where: {
      username: username
    }
  })
  .then( user_salt => {
    var user = JSON.parse(JSON.stringify(user_salt)); // 強制濾掉多餘的資料，只保留查詢結果

    // 確定有查詢結果才 render
    if(user) res.render('user', {title: 'User Page', username: user.username, password: user.password});
    else res.sendStatus(404);

  })
  .catch( err => {
    // 404，頁面找不到
    res.sendStatus(404);
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

// 更新 User 資料
router.put('/:username', (req, res, next) => {
  var update_data = {
    password: req.body.password
  };

  db.User.update(update_data, {
    where: {
      username: req.params.username
    }
  })
  .then( result => {
    // 建議驗證 result 是否存在 (result === 1), 否則可能查詢不存在仍未報錯
    console.log('change a user password');
    res.json({
      status: 'success',
      description: 'update a user password',
      data: []
    });
  })
  .catch( err => {
    res.json({
      status: 'error',
      description: 'fail to update a user password',
      data: []
    });
  });

});

// 刪除特定 user
router.delete('/:username', (req, res, next) => {
  db.User.destroy({
    where: {
      username: req.params.username
    }
  })
  .then( () => {
    res.json({
      status: 'success',
      description: 'a user was deleted.',
      data: []
    });
  })
  .catch( err => {
    res.json({
      status: 'error',
      description: 'delete a user',
      data: []
    });
  });
});

module.exports = router;
