"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "user_number", {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn("cars", "user_allow_show_email", {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
  },

  async down(queryInterface) {
    return Promise.all([
      await queryInterface.removeColumn("cars", "user_number"),
      await queryInterface.removeColumn("cars", "user_allow_show_email")
    ])
  }
}
