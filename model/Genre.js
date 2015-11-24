"use strict";

module.exports = function(sequelize, DataTypes) {

  // 每個 model 可以看成一個 table
  var genre = sequelize.define("genre", {
      genre_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      genre_name: DataTypes.STRING(255)
  }, {
    // 拿掉 Sequelize 預設的 CreatedAt 與 UpdatedAt 欄位
    timestamps: false,
    // 避免 Sequelize 自動把 table 名稱 + s
    freezeTableName: true,
    // 自定義 table name
    tableName: 'genre',
    // 定義 tables 關係 與 methods
    classMethods: {
      associate: function(models) {
        genre.hasMany(models.movie, {foreignKey: 'genre_id'});
      }
    }
  });
  return genre;
};
