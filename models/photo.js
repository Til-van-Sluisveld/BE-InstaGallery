"use strict";
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define(
    "photo",
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );
  photo.associate = function (models) {
    // associations can be defined here
    photo.belongsTo(models.user);
    photo.hasMany(models.order);
  };
  return photo;
};
