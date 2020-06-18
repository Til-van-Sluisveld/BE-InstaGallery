'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buyer_name: {
        type: Sequelize.STRING
      },
      buyer_email: {
        type: Sequelize.STRING
      },
      buyer_country: {
        type: Sequelize.STRING
      },
      buyer_city: {
        type: Sequelize.STRING
      },
      buyer_address: {
        type: Sequelize.STRING
      },
      buyer_zipcode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invoices');
  }
};