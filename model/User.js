"use strict";

module.exports = function(sequelize, DataTypes) {

  // 每個 model 可以看成一個 table
  var User = sequelize.define("User", {
    username: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    first_name: DataTypes.STRING(255),
    last_name: DataTypes.STRING(255),
    Gender: DataTypes.ENUM('', 'Male', 'Female'),
    joinDate: DataTypes.DATE
  });

  return User;
};
