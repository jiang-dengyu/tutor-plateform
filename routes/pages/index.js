const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.send('this is from routes/pages.js')
})

module.exports = router
