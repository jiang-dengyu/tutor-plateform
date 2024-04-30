const helpers = require('../helpers/auth-helpers')
/***************************************** */
const authenticatedUser = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (!helpers.getUser(req).isAdmin) {
      return next()
    } else {
      return res.redirect('/admin/users')
    }
  } else {
    return res.redirect('/signin')
  }
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
  authenticatedUser,
  authenticatedAdmin
}
