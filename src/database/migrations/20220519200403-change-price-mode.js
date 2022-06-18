"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cars", "price")
    await queryInterface.addColumn("cars", "price", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn("cars", "price"),
      await queryInterface.addColumn("cars", "price", {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ])
  }
}
