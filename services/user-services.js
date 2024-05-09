const { User, History, Comment, Reservation } = require('../models')
const bcrypt = require('bcryptjs')
const { localFileHandler } = require('../helpers/file-helpers.js')
/*********************************************** */
const userServices = {
  signUp: (req, cb) => {
    // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    // 先確認資料裡面沒有一樣的 email，若有，就建立一個 Error 物件並拋出
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then((hash) => {
        return User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isAdmin: false
        })
      })
      .then((newuser) => {
        return cb(null, {
          newuser
        })
      })
      .catch((err) => cb(err))
  },
  userPage: (req, cb) => {
    const user = req.user
    Promise.all([
      History.findAll({
        where: { userId: user.id },
        raw: true,
        nest: true,
        include: [Course]
      }),
      Reservation.findAll({
        where: { userId: user.id },
        raw: true,
        nest: true,
        include: [Course]
      }),
      Comment.findAll({
        where: { userId: user.id },
        raw: true,
        nest: true,
        include: [Course]
      }),
      User.findAll({
        attributes: ['totalHours'],
        raw: true
      })
    ])
      .then(([history, reservation, comment, allUsers]) => {
        const userTotalHours = user.totalHours
        const userRank = allUsers.filter((u) => u.totalHours > userTotalHours).length + 1
        return cb(null, { user, comment, history, reservation, userRank })
      })
      .catch((err) => {
        cb(err)
      })
  },
  userEdit: (req, cb) => {
    const userId = req.params.id
    const { userName, intro } = req.body
    if (!userName) throw new Error('User name is required!')
    const { file } = req
    localFileHandler(file)
      .then((filePath) => {
        return User.update(
          {
            name: userName,
            intro,
            image: filePath || 'https://loremflickr.com/320/240/portrait/?random=52.066561461711935'
          },
          { where: { id: userId } }
        )
      })
      .then((updatedUser) => {
        return cb(null, { updatedUser })
      })
      .catch((err) => cb(err))
  }
}
/**************************** */

module.exports = userServices
