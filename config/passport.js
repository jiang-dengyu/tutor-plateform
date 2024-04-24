const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const { User } = require('../models')
/*********************************** */

// Local登入驗證策略*****************************/
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      User.findOne({ where: { email: email } }).then((user) => {
        if (!user) return cb(null, false)
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) return cb(null, false)
          return cb(null, user)
        })
      })
    }
  )
)
// 登入存入session*****************************/
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
// 登入時從session比對，看是否已經是登入狀態*****************************/
passport.deserializeUser((id, cb) => {
  return User.findByPk(id).then((user) => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport
