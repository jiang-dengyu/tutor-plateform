const reserveServices = require('../../services/reserve-services')
/******************************* */
const reserveController = {
  reserve: (req, res, next) => {
    reserveServices.reserve(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  }
}
/******************************* */
module.exports = reserveController
