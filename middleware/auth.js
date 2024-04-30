const helpers = require('../helpers/auth-helpers')
/***************************************** */
const authenticatedUser = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (!helpers.getUser(req).isAdmin) {
      return next()
    } else {
      req.flash('error_messages', '管理者只能訪問候台')
      return res.redirect('/admin/users')
    }
  } else {
    req.flash('error_messages', '尚未登入')
    return res.redirect('/signin')
  }
}

const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin) return next()
    req.flash('error_messages', '非管理者不能訪問後台')
    res.redirect('/home')
  } else {
    req.flash('error_messages', '尚未登入')
    res.redirect('/signin')
  }
}

/************************ */
module.exports = {
  authenticatedUser,
  authenticatedAdmin
}
