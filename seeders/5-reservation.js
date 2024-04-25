'use strict'
const { generateReserve } = require('../helpers/seed-helpers.js')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reserve = generateReserve()
    await queryInterface.bulkInsert('Reservations', reserve, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {})
  }
}
