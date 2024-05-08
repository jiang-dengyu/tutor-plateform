const { User } = require('../models')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const GoogleStrategy = require('passport-google-oauth2')
const bcrypt = require('bcryptjs')

// JWT 登入驗證策略*****************************/
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findOne({
      attributes: ['id', 'email', 'name', 'isAdmin'],
      where: { id: jwtPayload.id },
      raw: true
    })
      .then((user) => cb(null, user))
      .catch((err) => cb(err))
  })
)

// Google OAuth 2.0登入驗證策略*****************************/
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, //給google看申請的ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //給google看申請的SECRET
      callbackURL: process.env.GOOGLE_CALLBACK_URL //完成登入google取得攜帶資訊後，需要導向的路由
    },
    (accessToken, refreshToken, profile, cb) => {
      const email = profile.emails[0].value
      const name = profile.displayName

      return User.findOne({
        attributes: ['id', 'email', 'name'],
        where: { email },
        raw: true
      })
        .then((user) => {
          if (user) return cb(null, user)

          const randomPwd = Math.random().toString(36).slice(-8)
          return bcrypt
            .hash(randomPwd, 10)
            .then((hash) => User.create({ name, email, password: hash }))
            .then((user) => {
              cb(null, { id: user.id, name: user.name, email: user.email })
            })
        })
        .catch((error) => {
          error.errorMessage = '登入失敗'
          cb(error)
        })
    }
  )
)
// Local登入驗證策略*****************************/
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
            return cb(null, user)
          })
        })
        .catch((err) => {
          return cb(err)
        })
    }
  )
)
// 登入存入session*****************************/
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
// 登入時從session比對，看是否已經是登入狀態*****************************/
passport.deserializeUser((id, cb) => {
  return User.findByPk(id).then((user) => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport
