const express = require('express')
const router = express.Router()
const courseController = require('../../controllers/apis/lesson-controller')

const { authenticatedUser, authenticatedAdmin } = require('../../middleware/auth.js')
const passport = require('../../config/passport')

const upload = require('../../middleware/multer')
const { generalErrorHandler } = require('../../middleware/error-handler')

/*********************************** */

router.get('/home', courseController.home)
/******************************************************** */
module.exports = router
