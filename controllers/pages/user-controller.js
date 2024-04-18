const db = require('../../models')
const User = db.User
const bcrypt = require('bcryptjs')
/********************************** */
const userController = {
  signUpPage: (req, res) => {
    console.log('斷點1')
    return res.render('signUp')
  },
  signUp: (req, res, next) => {
    console.log('斷點2')

    // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    // 先確認資料裡面沒有一樣的 email，若有，就建立一個 Error 物件並拋出
    console.log('斷點2-2')
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        console.log('斷點2-3')
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then((hash) => {
        console.log('斷點3')
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
    console.log('斷點5')
    return res.render('signIn')
  },
  signIn: (req, res, next) => {
    return res.redirect('/home')
  },
  logOut: (req, res) => {
    req.logout() //passport提供的logout()
    res.redirect('/signIn')
  }
}
/********************************** */
module.exports = userController
