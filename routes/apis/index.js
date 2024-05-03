const express = require('express')
const router = express.Router()
const courseController = require('../../controllers/apis/course-controller.js')
const { apiErrorHandler } = require('../../middleware/error-handler')

/*********************************** */

router.get('/home', courseController.home)
router.use('/', apiErrorHandler)
/******************************************************** */
module.exports = router
