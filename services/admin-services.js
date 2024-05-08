const { User } = require('../models')

/*********************************************** */
const adminController = {
  adminUsers: (req, cb) => {
    User.findAll({
      attributes: ['name', 'email', 'isAdmin'],
      raw: true
    })
      .then((users) => {
        console.log(users)
        return cb(null, { users })
      })
      .catch((err) => cb(err))
  }
}
/**************************** */

module.exports = adminController
