"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "last_name", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("users", "last_name")
  }
}
