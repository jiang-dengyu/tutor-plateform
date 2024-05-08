const passport = require('../config/passport')

/*************************** */

const apiAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
    req.user = user //passport.authenticate自行寫cb函式的話，req.user要自己放進去
    next()
  })(req, res, next)
}
const apiAuthenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: '非後台管理者帳號無法進入後台' })
}
const apiAuthenticatedUser = (req, res, next) => {
  if (req.user && req.user.isAdmin) return res.status(403).json({ status: 'error', message: '後台管理者帳號無法進入前台' })
  return next()
}
module.exports = {
  apiAuthenticated,
  apiAuthenticatedAdmin,
  apiAuthenticatedUser
}
//api的Authenticated middleware設計成3個：
//apiAuthenticated只驗證是否為合法token，apiAuthenticatedAdmin驗證是否為後台身分，apiAuthenticatedUser驗證一般使用者
//簡單舉例，在非後台路由內，apiAuthenticated、apiAuthenticatedUser通常會一起使用
