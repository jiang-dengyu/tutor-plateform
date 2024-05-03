const courseServices = require('../../services/course-services')
/******************************* */
const courseController = {
  home: (req, res, next) => {
    courseServices.home(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  }
}
/******************************* */
module.exports = courseController
