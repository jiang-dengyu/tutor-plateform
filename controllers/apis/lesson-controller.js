const courseServices = require('../../services/course-services')
/******************************* */
const courseController = {
  home: (req, res, next) => {
    courseServices.home(req, (err, data) => (err ? next(err) : res.json(data)))
  }
}
/******************************* */
module.exports = courseController
