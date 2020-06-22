"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("photos", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("orders", "photoId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "photos",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("orders", "invoiceId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("photos", "userId");
    await queryInterface.removeColumn("orders", "photoId");
    await queryInterface.removeColumn("orders", "invoiceId");
  },
};
