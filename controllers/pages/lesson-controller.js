const { Course, Comment, Reservation } = require('../../models')
const { localFileHandler } = require('../../helpers/file-helpers.js')
const { getOffset, getPagination } = require('../../helpers/pagination-helpers.js')
/******************************* */
const courseController = {
  home: (req, res, next) => {
    const DEFAULT_LIMIT = 6
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(page, limit)
    Course.findAndCountAll({
      limit,
      offset,
      raw: true
    })
      .then((courses) => {
        return res.render('home', { courses: courses.rows, pagination: getPagination(page, limit, courses.count) })
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
        return Promise.all([
          Course.findOne({
            where: { userId: user.id },
            raw: true
          }),
          Reservation.findAll({
            where: { courseId: course.id },
            raw: true
          }),
          Comment.findAll({
            where: { courseId: course.id },
            raw: true
          })
        ])
      })

      .then(([course, reservation, comment]) => {
        return res.render('teacher', { user, course, reservation, comment })
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
  },
  search: (req, res) => {
    if (!req.query.keyword) {
      return res.redirect('/home')
    }
    const keywords = req.query.keyword
    const keyword = keywords.trim().toLowerCase()
    console.log('這裡keyword是', keyword)
    const DEFAULT_LIMIT = 6
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(page, limit)

    return Course.findAndCountAll({
      attributes: ['id', 'name', 'image'],
      limit,
      offset,
      raw: true
    })
      .then((coursesData) => {
        console.log('這裡coursesData是', coursesData) //顯示Course.findAndCountAll結果
        const filterCoursesData = coursesData.rows.filter((data) => data.name.toLowerCase().includes(keyword))
        console.log('這裡filterCoursesData是', filterCoursesData)
        console.log('這裡getPagination是', getPagination(page, limit, filterCoursesData.length))

        return res.render('home', {
          courses: filterCoursesData,
          pagination: getPagination(page, limit, filterCoursesData.length)
        })
      })
      .catch((err) => console.log(err))
  }
}
/******************************* */
module.exports = courseController
