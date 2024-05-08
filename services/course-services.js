const { User, Course, Comment, Reservation } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')
const { localFileHandler } = require('../helpers/file-helpers.js')
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
  },
  teacherPage: (req, cb) => {
    const user = req.user
    Course.findOne({
      where: { userId: user.id },
      raw: true
    })
      .then((course) => {
        if (!course) throw new Error('此帳號查無老師個人頁面')
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
        return cb(null, { user, course, reservation, comment })
      })
      .catch((err) => cb(err))
  },
  coursePage: (req, cb) => {
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
        return cb(null, { user, course, comment })
      })
      .catch((err) => cb(err))
  },
  teacherEdit: (req, cb) => {
    const userId = req.user.id
    const courseId = req.params.id
    const { courseName, style, introduction, link, days } = req.body
    if (!courseName) throw new Error('Course name is required!')
    const { file } = req
    localFileHandler(file)
      .then((filePath) => {
        return Course.update(
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
      })
      .then((unpdatedCourse) => {
        return cb(null, { unpdatedCourse })
      })
      .catch((err) => cb(err))
  },
  search: (req, cb) => {
    if (!req.query.keyword) {
      return res.redirect('/home')
    }
    const keywords = req.query.keyword
    const keyword = keywords.trim().toLowerCase()
    return Course.findAll({
      attributes: ['id', 'name', 'image'],
      raw: true
    })
      .then((coursesData) => {
        const filterCoursesData = coursesData.filter((data) => data.name.toLowerCase().includes(keyword))
        return cb(null, { courses: filterCoursesData })
      })
      .catch((err) => cb(err))
  }
}

/******************************************************** */
module.exports = courseServices
