const passport = require('../config/passport')

/*************************** */
const apiAuthenticated = passport.authenticate('jwt', { session: false })
const apiAuthenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: '非後台管理者帳號無法進入後台' })
}
const apiAuthenticatedUser = (req, res, next) => {
  if (req.user && !req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: '後台管理者帳號無法進入前台' })
}
module.exports = {
  apiAuthenticated,
  apiAuthenticatedAdmin,
  apiAuthenticatedUser
}
