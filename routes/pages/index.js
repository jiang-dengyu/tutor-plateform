const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const courseController = require('../../controllers/pages/lesson-controller')
const reserveController = require('../../controllers/pages/reserve-controller')
const commentController = require('../../controllers/pages/comment-controller')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth.js')
const passport = require('passport')
const upload = require('../../middleware/multer')
const { generalErrorHandler } = require('../../middleware/error-handler')
/*********************************** */
const admin = require('./modules/admin.js')
router.use('/admin', authenticatedAdmin, admin)
/********************************** */
router.get('/signUp', userController.signUpPage)
router.post('/signUp', userController.signUp)
router.get('/signIn', userController.signInPage)
router.post('/signIn', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logOut', userController.logOut)

router.get('/users/:id', authenticated, userController.userPage)

router.get('/comments/:id', authenticated, commentController.getComment)
router.post('/comments/:id', authenticated, commentController.postComment)

router.get('/course/:id', authenticated, courseController.coursePage)
router.get('/course', authenticated, courseController.applyPage)
router.post('/course', authenticated, courseController.apply)

router.post('/reservation/courses/:id', authenticated, reserveController.reserve)
router.get('/teacher/edit/:id', authenticated, courseController.teacherEditPage)
router.put('/teacher/edit/:id', authenticated, upload.single('image'), courseController.teacherEdit)
router.get('/teacher/:id', authenticated, courseController.teacherPage)
router.get('/home', authenticated, courseController.home)
router.get('/', (req, res) => res.redirect('/home'))

router.use('/', generalErrorHandler)
/******************************************************** */
module.exports = router
