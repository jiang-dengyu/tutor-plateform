const helpers = require('../helpers/auth-helpers')
/***************************************** */
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    return next()
  } //若使用者是已登入，就是true，就跑下一個middleware
  console.log('斷點 尚未登入')
  res.redirect('/signIn')
}
const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin) return next()
    console.log('斷點 並非admin')
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
