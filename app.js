if (true) {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { pages, apis } = require('./routes')
const handlebars = require('express-handlebars')
const session = require('express-session')
const SESSION_SECRET = 'BIGSECRET'
/***************************************** */
app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')
/**************************************************** */
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use('/api', apis)
app.use(pages)
/*********************************************************** */
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
