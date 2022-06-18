"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "user_name", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cars", "user_name")
  }
}
