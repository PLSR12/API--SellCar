"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "gear", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("cars", "gear")
  }
}
