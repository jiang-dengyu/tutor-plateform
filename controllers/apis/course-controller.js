const courseServices = require('../../services/course-services')
/******************************* */
const courseController = {
  home: (req, res, next) => {
    courseServices.home(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  },
  getCourseId: (req, res, next) => {
    courseServices.getCourseId(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  },
  apply: (req, res, next) => {
    courseServices.apply(req, (err, data) => (err ? next(err) : res.json({ status: 'sucess', data })))
  },
  teacherPage: (req, res, next) => {
    courseServices.teacherPage(req, (err, data) => (err ? next(err) : res.json({ status: 'sucess', data })))
  },
  coursePage: (req, res, next) => {
    courseServices.coursePage(req, (err, data) => (err ? next(err) : res.json({ status: 'sucess', data })))
  },
  teacherEdit: (req, res, next) => {
    courseServices.teacherEdit(req, (err, data) => (err ? next(err) : res.json({ status: 'sucess', data })))
  },
  search: (req, res, next) => {
    courseServices.search(req, (err, data) => (err ? next(err) : res.json({ status: 'sucess', data })))
  }
}
/******************************* */
module.exports = courseController
