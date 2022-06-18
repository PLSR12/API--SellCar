"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "age", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("users", "age")
  }
}
