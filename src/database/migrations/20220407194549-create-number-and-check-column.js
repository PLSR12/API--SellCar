'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'number', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('users', 'allow_show_email', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    })
  },

  async down(queryInterface) {
    return Promise.all([
      await queryInterface.removeColumn('users', 'number'),
      await queryInterface.removeColumn('users', 'allow_show_email'),
    ])
  },
}
