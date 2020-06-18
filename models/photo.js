"use strict";
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define(
    "photo",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  photo.associate = function (models) {
    // associations can be defined here
  };
  return photo;
};
