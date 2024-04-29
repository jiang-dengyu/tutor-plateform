const { User, Course, Comment, History, Reservation } = require('../../models')
const bcrypt = require('bcryptjs')
/********************************** */
const userController = {
  signUpPage: (req, res) => {
    return res.render('signUp')
  },
  signUp: (req, res, next) => {
    // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    // 先確認資料裡面沒有一樣的 email，若有，就建立一個 Error 物件並拋出
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then((hash) => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isAdmin: false
        })
      })
      .then(() => {
        res.redirect('/signin')
      })
      .catch((err) => next(err))
  },
  signInPage: (req, res) => {
    return res.render('signIn')
  },
  signIn: (req, res) => {
    return res.redirect('/home')
  },
  logOut: (req, res) => {
    req.logout() //passport提供的logout()
    return res.redirect('/signIn')
  },
  userPage: (req, res, next) => {
    const user = req.user
    Promise.all([
      History.findAll({
        where: { userId: user.id },
        raw: true
      }),
      Reservation.findAll({
        where: { userId: user.id },
        raw: true
      }),
      Comment.findAll({
        where: { userId: user.id },
        raw: true
      }),
      User.findAll({
        attributes: ['totalHours'],
        raw: true
      })
    ])
      .then(([history, reservation, comment, allUsers]) => {
        const userTotalHours = user.totalHours
        const userRank = allUsers.filter((u) => u.totalHours > userTotalHours).length + 1
        return res.render('profile', { user, comment, history, reservation, userRank })
      })
      .catch((err) => {
        next(err)
      })
  }
}
/********************************** */
module.exports = userController
