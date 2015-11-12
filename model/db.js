"use strict"

var Sequelize = require("sequelize")
  , fs        = require('fs')
  , path      = require('path')
;


var db = {};

// DB configuration
var config = require('../config/config.json');

// initial sequelize
var sequelize = new Sequelize(config.db_name, config.db_username, config.db_password, {
  host   : config.db_host,
  dialect: config.db_type,
  port   : config.db_port,
  pool   : {
    max   : 5,
    min   : 0,
    idle  : 10000
  },
});

// 將當前目錄底下的檔案全部讀入轉成 model ，放置 db 物件底下匯出，物件名稱與檔案名稱相同
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "db.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
