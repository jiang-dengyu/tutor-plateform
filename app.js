if (true) {
  require('dotenv').config()
}
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { pages, apis } = require('./routes')
const handlebars = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const session = require('express-session')
const SESSION_SECRET = 'BIGSECRET'
const { getUser } = require('./helpers/auth-helpers.js')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')

/***************************************** */
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
/**************************************************** */

app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/*解析session區域********************************** */
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
/*flash區域********************************** */
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定'success_msg'放置在res.locals.success_messages
  res.locals.error_messages = req.flash('error_messages') // 設定 'warning_msg'
  next()
})
/****************************************** */
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = getUser(req)
  next()
})
app.use('/api', apis)
app.use(pages)
/*********************************************************** */
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
