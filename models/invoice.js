"use strict";
module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define(
    "invoice",
    {
      buyer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyer_zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  invoice.associate = function (models) {
    // associations can be defined here
    invoice.hasMany(model.order);
  };
  return invoice;
};
