"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "birth_date", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("users", "birth_date")
  }
}
