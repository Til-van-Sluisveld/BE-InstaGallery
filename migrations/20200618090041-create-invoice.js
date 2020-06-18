"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      buyer_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      buyer_email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      buyer_country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      buyer_city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      buyer_address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      buyer_zipcode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("invoices");
  },
};
