const adminServices = require('../../services/admin-services')
/******************************* */
const adminController = {
  adminUsers: (req, res, next) => {
    adminServices.adminUsers(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  }
}
/******************************* */
module.exports = adminController
