const { User, Course } = require('../../models')
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
        return res.json({ courses: courses.rows, pagination: getPagination(page, limit, courses.count), allUsers })
      })
      .catch((err) => next(err))
  }
}
/******************************* */
module.exports = courseController
