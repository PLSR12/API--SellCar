"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "category_id", {
      type: Sequelize.INTEGER,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("cars", "category_id")
  }
}
