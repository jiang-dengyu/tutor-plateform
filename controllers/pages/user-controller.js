const db = require('../../models')
const User = db.User
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
  signIn: (req, res, next) => {
    return res.redirect('/home')
  },
  logOut: (req, res) => {
    req.logout() //passport提供的logout()
    res.redirect('/signIn')
  },
  userPage: (req, res) => {
    const user = req.user
    console.log(user)
    return res.render('profile', { user })
  }
}
/********************************** */
module.exports = userController