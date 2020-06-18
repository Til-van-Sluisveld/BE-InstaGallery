'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};