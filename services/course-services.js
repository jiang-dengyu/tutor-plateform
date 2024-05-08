const { User, Course } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')
/****************************** */
const courseServices = {
  home: (req, cb) => {
    const DEFAULT_LIMIT = 6
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(page, limit)
    Promise.all([
      Course.findAndCountAll({
        limit,
        offset,
        raw: true
      }),
      User.findAll({
        attributes: ['name', 'totalHours'],
        order: [['totalHours', 'DESC']],
        limit: 5,
        raw: true
      })
    ])
      .then(([courses, allUsers]) => {
        return cb(null, {
          courses: courses.rows,
          pagination: getPagination(page, limit, courses.count),
          allUsers
        })
      })
      .catch((err) => cb(err))
  },
  getCourseId: (req, cb) => {
    const id = req.params.courseId
    Course.findOne({ where: { id } })
      .then((course) => {
        return cb(null, {
          course: course
        })
      })
      .catch((err) => cb(err))
  },
  apply: (req, cb) => {
    const userId = req.user.id
    const { courseName, introduction, style, days } = req.body

    Course.findOne({ where: { userId }, raw: true })
      .then((checkTeacher) => {
        if (checkTeacher) throw new Error('此帳號已經為老師帳號 不能夠重複申請')
        return Course.create({
          name: courseName,
          introduction: introduction,
          style: style,
          dayOfWeek: days,
          userId: req.user.id
        })
      })
      .then((newCourse) => {
        return cb(null, { newCourse })
      })
      .catch((err) => cb(err))
  }
}
/******************************************************** */
module.exports = courseServices
