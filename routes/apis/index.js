const express = require('express')
const router = express.Router()
const courseController = require('../../controllers/apis/course-controller.js')
const userController = require('../../controllers/apis/user-controller')
const passport = require('../../config/passport')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { apiAuthenticated, apiAuthenticatedAdmin, apiAuthenticatedUser } = require('../../middleware/api-auth')
const upload = require('../../middleware/multer')
/*********************************** */
router.post('/signIn', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signUp', userController.signUp)
router.get('/users/:id', apiAuthenticated, apiAuthenticatedUser, userController.userPage)

router.get('/course/search', apiAuthenticated, apiAuthenticatedUser, courseController.search)
router.get('/courses/:courseId', apiAuthenticated, apiAuthenticatedUser, courseController.getCourseId)
router.get('/course/:id', apiAuthenticated, apiAuthenticatedUser, courseController.coursePage)
router.post('/course', apiAuthenticated, apiAuthenticatedUser, courseController.apply)

router.put('/teacher/edit/:id', apiAuthenticated, apiAuthenticatedUser, upload.single('image'), courseController.teacherEdit)
router.get('/teacher/:id', apiAuthenticated, apiAuthenticatedUser, courseController.teacherPage)
router.get('/home', courseController.home)
/******************************************************** */
router.use('/', apiErrorHandler)
module.exports = router
