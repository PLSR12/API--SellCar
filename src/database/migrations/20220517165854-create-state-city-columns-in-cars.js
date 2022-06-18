"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "user_state", {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn("cars", "user_city", {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn("cars", "user_state"),
      await queryInterface.removeColumn("cars", "user_city")
    ])
  }
}
