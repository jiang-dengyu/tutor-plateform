const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { pages, apis } = require('./routes')
const handlebars = require('express-handlebars')

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')
/*************************************************************** */
app.use(express.urlencoded({ extended: true }))
app.use('/api', apis)
app.use(pages)
/***************************************************************** */
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
