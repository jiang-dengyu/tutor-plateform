'use strict'
const faker = require('faker')
const { getRandomDays } = require('../helpers/seed-helpers.js')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let userId = 7
    for (let i = 1; i < 21; i++) {
      await queryInterface.bulkInsert('Courses', [
        {
          id: i,
          name: faker.name.findName(),
          introduction: faker.lorem.text(),
          style: faker.lorem.words(),
          day_of_week: JSON.stringify(getRandomDays()),
          duration: '',
          class_link: faker.internet.url(),
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
      userId++
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', {})
  }
}
