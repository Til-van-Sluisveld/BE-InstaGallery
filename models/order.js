"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  order.associate = function (models) {
    // associations can be defined here
    order.belongsTo(models.photo);
    order.belongsTo(models.invoice);
  };
  return order;
};
