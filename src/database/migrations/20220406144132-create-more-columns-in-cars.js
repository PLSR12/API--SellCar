"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "brand", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.addColumn("cars", "model", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.addColumn("cars", "version", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.addColumn("cars", "km", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.addColumn("cars", "description", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  async down(queryInterface) {
    return Promise.all([
      await queryInterface.removeColumn("cars", "brand"),
      await queryInterface.removeColumn("cars", "model"),
      await queryInterface.removeColumn("cars", "version"),
      await queryInterface.removeColumn("cars", "km"),
      await queryInterface.removeColumn("cars", "description")
    ])
  }
}
