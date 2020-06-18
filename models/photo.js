'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
  };
  return photo;
};