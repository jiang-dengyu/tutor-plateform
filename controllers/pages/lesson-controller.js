const { Course, Comment } = require('../../models')
const { localFileHandler } = require('../../helpers/file-helpers.js')
/******************************* */
const courseController = {
  home: (req, res, next) => {
    Course.findAll({
      raw: true
    })
      .then((courses) => {
        return res.render('home', { courses })
      })
      .catch((err) => next(err))
  },
  applyPage: (req, res) => {
    return res.render('apply')
  },
  apply: (req, res, next) => {
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
        console.log(course)
        return res.render('teacher', { user, course })
      })
      .catch((err) => next(err))
  },
  coursePage: (req, res, next) => {
    const user = req.user
    const courseId = req.params.id
    Promise.all([
      Course.findOne({
        where: { id: courseId },
        raw: true
      }),
      Comment.findAll({
        where: { courseId: courseId },
        raw: true
      })
    ])
      .then(([course, comment]) => {
        return res.render('course', { user, course, comment })
      })
      .catch((err) => next(err))
  },
  teacherEditPage: (req, res, next) => {
    const courseId = req.params.id
    Course.findOne({ where: { id: courseId } })
      .then((course) => {
        return res.render('teacherEdit', { course: course.toJSON() })
      })
      .catch((err) => next(err))
  },
  teacherEdit: (req, res, next) => {
    const userId = req.user.id
    const courseId = req.params.id
    const { courseName, style, introduction, link, days } = req.body
    if (!courseName) throw new Error('Course name is required!')
    const { file } = req
    localFileHandler(file)
      .then((filePath) =>
        Course.update(
          {
            name: courseName,
            style,
            introduction,
            link,
            dayOfWeek: days,
            image: filePath || null
          },
          { where: { id: courseId, userId: userId } }
        )
      )
      .then(() => {
        res.redirect(`/teacher/${courseId}`)
      })
      .catch((err) => next(err))
  }
}
/******************************* */
module.exports = courseController
