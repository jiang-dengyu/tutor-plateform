const helpers = require('../helpers/auth-helpers')
/***************************************** */
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    return next()
  } //若使用者是已登入，就是true，就跑下一個middleware
  res.redirect('/signIn')
}
const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin) return next()
    res.redirect('/home')
  } else {
    res.redirect('/signin')
  }
}
/************************ */
module.exports = {
  authenticated,
  authenticatedAdmin
}
