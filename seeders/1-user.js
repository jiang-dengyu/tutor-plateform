'use strict'
const bcrypt = require('bcryptjs')
const { generateUser } = require('../helpers/seed-helpers.js')
const users = []

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('12345678', 10)
    for (let i = 1; i < 27; i++) {
      const email = i === 1 ? 'root@example.com' : `user${i}@example.com`
      const isAdmin = i === 1 ? true : false
      let newUser = generateUser(i, email, isAdmin, `user${i}`, password)
      users.push(newUser)
    }
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
