'use strict';
module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define('invoice', {
    buyer_name: DataTypes.STRING,
    buyer_email: DataTypes.STRING,
    buyer_country: DataTypes.STRING,
    buyer_city: DataTypes.STRING,
    buyer_address: DataTypes.STRING,
    buyer_zipcode: DataTypes.STRING
  }, {});
  invoice.associate = function(models) {
    // associations can be defined here
  };
  return invoice;
};