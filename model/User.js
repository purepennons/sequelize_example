"use strict";

module.exports = function(sequelize, DataTypes) {

  // 每個 model 可以看成一個 table
  var User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true
    },
    password: DataTypes.STRING(255),
    first_name: DataTypes.STRING(255),
    last_name: DataTypes.STRING(255),
    Gender: DataTypes.ENUM('', 'Male', 'Female'),
    joinDate: DataTypes.DATE,
  }, {
    // 拿掉 Sequelize 預設的 CreatedAt 與 UpdatedAt 欄位
    timestamps: false,
    // 避免 Sequelize 自動把 table 名稱 + s
    freezeTableName: true,
    // 自定義 table name
    tableName: 'member'
  });

  return User;
};
