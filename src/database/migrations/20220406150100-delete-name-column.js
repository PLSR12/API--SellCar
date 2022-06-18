"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn("cars", "name")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "name", {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
}
