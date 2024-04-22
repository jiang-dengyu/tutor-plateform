const { Course } = require('../../models')
/******************************* */
const courseController = {
  home: (req, res) => {
    return res.render('home')
  },
  applyPage: (req, res) => {
    return res.render('apply')
  },
  apply: (req, res, next) => {
    console.log(req.body)
    const { courseName, introduction, style, days } = req.body
    Course.create({
      name: courseName,
      introduction: introduction,
      style: style,
      dayOfWeek: days,
      userId: req.user.id
    })
      .then(() => {
        return res.redirect('/teacher/:id')
      })
      .catch((err) => next(err))
  },
  teacherPage: (req, res, next) => {
    const user = req.user
    Course.findOne({
      where: { userId: user.id },
      raw: true
    })
      .then((course) => {
        return res.render('teacher', { user, course })
      })
      .catch((err) => next(err))
  }
}
/******************************* */
module.exports = courseController
