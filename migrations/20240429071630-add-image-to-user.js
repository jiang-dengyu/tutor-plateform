'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('Users', 'image', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'intro', {
        type: Sequelize.TEXT
      })
    ])
  },
  async down(queryInterface, Sequelize) {
    await Promise.all([queryInterface.removeColumn('Users', 'image'), queryInterface.removeColumn('Users', 'intro')])
  }
}
