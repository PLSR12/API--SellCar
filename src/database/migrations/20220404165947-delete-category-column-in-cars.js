"use strict"

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn("cars", "category")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createColumn("cars", {
      category: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  }
}
