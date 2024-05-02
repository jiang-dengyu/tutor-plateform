const { User } = require('../../models')

/******************************* */
const adminController = {
  adminUsers: (req, res, next) => {
    User.findAll({ raw: true })
      .then((users) => {
        return res.render('admin/user', { users })
      })
      .catch((err) => next(err))
  }
}
/******************************* */
module.exports = adminController
