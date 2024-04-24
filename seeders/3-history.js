'use strict'
const { generateHistory } = require('../helpers/seed-helpers.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const history = generateHistory()
    await queryInterface.bulkInsert('Histories', history, {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Histories', null, {})
  }
}
