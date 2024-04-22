'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          email: 'root@example.com',
          password: await bcrypt.hash('12345678', 10),
          is_admin: true,
          name: 'root',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          email: 'user1@example.com',
          password: await bcrypt.hash('12345678', 10),
          is_admin: false,
          name: 'user1',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          email: 'user2@example.com',
          password: await bcrypt.hash('12345678', 10),
          is_admin: false,
          name: 'user2',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          email: 'user3@example.com',
          password: await bcrypt.hash('12345678', 10),
          is_admin: false,
          name: 'user3',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5,
          email: 'user4@example.com',
          password: await bcrypt.hash('12345678', 10),
          is_admin: false,
          name: 'user4',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 6,
          email: 'user5@example.com',
          password: await bcrypt.hash('12345678', 10),
          is_admin: false,
          name: 'user5',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
