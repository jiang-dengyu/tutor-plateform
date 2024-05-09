const { User, Course, Comment, History, Reservation } = require('../../models')
const bcrypt = require('bcryptjs')
const { localFileHandler } = require('../../helpers/file-helpers.js')
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
        return res.redirect('/signin')
      })
      .catch((err) => next(err))
  },
  signInPage: (req, res) => {
    return res.render('signIn')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
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
        return res.render('profile', { user, comment, history, reservation, userRank })
      })
      .catch((err) => {
        next(err)
      })
  },
  userEditPage: (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId, {
      raw: true
    })
      .then((user) => {
        if (!user) throw new Error('找不到使用者資訊!')
        return res.render('userEditPage', { user })
      })
      .catch((err) => {
        next(err)
      })
  },
  userEdit: (req, res, next) => {
    const userId = req.params.id
    const { userName, intro } = req.body
    if (!userName) throw new Error('User name is required!')
    const { file } = req
    localFileHandler(file)
      .then((filePath) =>
        User.update(
          {
            name: userName,
            intro,
            image: filePath || 'https://loremflickr.com/320/240/portrait/?random=52.066561461711935'
          },
          { where: { id: userId } }
        )
      )
      .then(() => {
        return res.redirect(`/users/${userId}`)
      })
      .catch((err) => next(err))
  }
}
/********************************** */
module.exports = userController
