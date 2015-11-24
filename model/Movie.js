"use strict";

module.exports = function(sequelize, DataTypes) {

  // 每個 model 可以看成一個 table
  var movie = sequelize.define("movie", {
      movie_id: {
          type: DataTypes.STRING(10),
          primaryKey: true
      },
      title: DataTypes.STRING(255),
      genre_id: {
        type: DataTypes.INTEGER(11),
        unique: true
      },
      age_rating: DataTypes.INTEGER(11),
      releaseDate: DataTypes.DATE,
      storyline: DataTypes.TEXT,
  }, {
      // 拿掉 Sequelize 預設的 CreatedAt 與 UpdatedAt 欄位
      timestamps: false,
      // 避免 Sequelize 自動把 table 名稱 + s
      freezeTableName: true,
      // 自定義 table name
      tableName: 'movie',
      // 定義 tables 關係 與 methods
      classMethods: {
        associate: function(models) {
          movie.belongsTo(models.genre, {foreignKey : 'genre_id'});
        }
      }
  });
  return movie;
};
