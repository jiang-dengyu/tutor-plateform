'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'history_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'history_id')
  }
}
