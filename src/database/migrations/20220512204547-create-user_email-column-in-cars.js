"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "user_email", {
      type: Sequelize.STRING,
      references: { model: "users", key: "email" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("cars", "user_email")
  }
}
