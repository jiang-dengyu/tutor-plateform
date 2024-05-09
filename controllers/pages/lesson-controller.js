const { User, Course, Comment, Reservation } = require('../../models')
const { localFileHandler } = require('../../helpers/file-helpers.js')
const { getOffset, getPagination } = require('../../helpers/pagination-helpers.js')
/******************************* */
const courseController = {
  home: (req, res, next) => {
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
        return res.render('home', { courses: courses.rows, pagination: getPagination(page, limit, courses.count), allUsers })
      })
      .catch((err) => next(err))
  },
  applyPage: (req, res) => {
    return res.render('apply')
  },
  apply: (req, res, next) => {
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
            raw: true,
            nest: true,
            include: [User]
          }),
          Comment.findAll({
            where: { courseId: course.id },
            raw: true,
            nest: true,
            include: [User]
          })
        ])
      })

      .then(([course, reservation, comment]) => {
        console.log(reservation)
        console.log(comment)
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
        raw: true,
        nest: true,
        include: [User]
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
    return Course.findAll({
      attributes: ['id', 'name', 'image'],
      raw: true
    })
      .then((coursesData) => {
        const filterCoursesData = coursesData.filter((data) => data.name.toLowerCase().includes(keyword))
        return res.render('home', { courses: filterCoursesData })
      })
      .catch((err) => console.log(err))
  }
}
/******************************* */
module.exports = courseController
