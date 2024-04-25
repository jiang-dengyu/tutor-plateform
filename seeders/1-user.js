'use strict'
const bcrypt = require('bcryptjs')
const { generateUser } = require('../helpers/seed-helpers.js')
const users = []

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('12345678', 10)
    //迴圈產生26筆user資料，包含 admin*1 學生user*5 老師user*20
    for (let i = 1; i < 27; i++) {
      const email = i === 1 ? 'root@example.com' : `user${i}@example.com` //第1筆給admin(admin帳號格式跟後面不一樣)
      const isAdmin = i === 1 ? true : false
      let newUser = generateUser(i, email, isAdmin, `user${i}`, password) //「產生物件」寫在helper.js
      users.push(newUser) //每圈完成新增一筆，就存進users陣列
    }
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}
