"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "year", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("cars", "year")
  }
}
