"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("photos", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("orders", "photo_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "photos",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("orders", "invoice_id", {
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
    await queryInterface.removeColumn("photos", "user_id");
    await queryInterface.removeColumn("orders", "photo_id");
    await queryInterface.removeColumn("orders", "invoice_id");
  },
};
