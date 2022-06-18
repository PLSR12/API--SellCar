"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "state", {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn("users", "city", {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn("users", "state"),
      await queryInterface.removeColumn("users", "city")
    ])
  }
}
