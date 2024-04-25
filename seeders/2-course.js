'use strict'
const faker = require('faker')
const { getRandomDays } = require('../helpers/seed-helpers.js')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let userId = 7 //參照seeder user.js預設從7開始為老師，回圈產生20筆course資料
    for (let i = 1; i < 21; i++) {
      await queryInterface.bulkInsert('Courses', [
        {
          id: i,
          name: faker.name.findName(),
          introduction: faker.lorem.text(),
          style: faker.lorem.words(),
          day_of_week: JSON.stringify(getRandomDays()), //「隨機產生開課星期陣列」寫在helper.js
          duration: '',
          class_link: faker.internet.url(),
          user_id: userId,
          image: `https://loremflickr.com/320/240/people/?random=${Math.random() * 100}`,
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
