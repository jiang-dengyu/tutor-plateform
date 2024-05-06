const express = require('express')
const router = express.Router()
const courseController = require('../../controllers/apis/course-controller.js')
const userController = require('../../controllers/apis/user-controller')
const passport = require('../../config/passport')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { apiAuthenticated, apiAuthenticatedAdmin, apiAuthenticatedUser } = require('../../middleware/api-auth')
/*********************************** */
router.post('/signIn', passport.authenticate('local', { session: false }), userController.signIn)

router.get('/courses/:courseId', apiAuthenticated, apiAuthenticatedUser, courseController.getCourseId)

router.get('/home', courseController.home)
/******************************************************** */
router.use('/', apiErrorHandler)
module.exports = router
