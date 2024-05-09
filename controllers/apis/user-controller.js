const { User, Course, Comment, History, Reservation } = require('../../models')

const jwt = require('jsonwebtoken')
const userServices = require('../../services/user-services')

/********************************** */
const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' }) // 簽發 JWT，效期為 30 天
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  },
  userPage: (req, res, next) => {
    userServices.userPage(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  },
  userEdit: (req, res, next) => {
    userServices.userEdit(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  }
}
/********************************** */
module.exports = userController
