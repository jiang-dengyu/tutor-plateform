'use strict'
const { generateComment } = require('../helpers/seed-helpers.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comment = generateComment()
    await queryInterface.bulkInsert('Comments', comment, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {})
  }
}
