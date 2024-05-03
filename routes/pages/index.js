const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const courseController = require('../../controllers/pages/lesson-controller')
const reserveController = require('../../controllers/pages/reserve-controller')
const commentController = require('../../controllers/pages/comment-controller')
const { authenticatedUser, authenticatedAdmin } = require('../../middleware/auth.js')
const passport = require('../../config/passport')

const upload = require('../../middleware/multer')
const { generalErrorHandler } = require('../../middleware/error-handler')

/*********************************** */
const admin = require('./modules/admin.js')
router.use('/admin', authenticatedAdmin, admin)
/********************************** */
router.get('/signUp', userController.signUpPage)
router.post('/signUp', userController.signUp)

router.get('/signIn/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/oauth2/redirect/google', passport.authenticate('google', { successRedirect: '/home', failureRedirect: '/signIn', failureFlash: true }))
router.post('/signIn', passport.authenticate('local', { failureRedirect: '/signIn', failureFlash: true }), userController.signIn)
router.get('/signIn', userController.signInPage)
router.get('/logOut', userController.logOut)

router.get('/users/:id', authenticatedUser, userController.userPage)

router.get('/comments/:id', authenticatedUser, commentController.getComment)
router.post('/comments/:id', authenticatedUser, commentController.postComment)

router.get('/course/search', authenticatedUser, courseController.search)
router.get('/course/:id', authenticatedUser, courseController.coursePage)
router.get('/course', authenticatedUser, courseController.applyPage)
router.post('/course', authenticatedUser, courseController.apply)

router.post('/reservation/courses/:id', authenticatedUser, reserveController.reserve)
router.get('/teacher/edit/:id', authenticatedUser, courseController.teacherEditPage)
router.put('/teacher/edit/:id', authenticatedUser, upload.single('image'), courseController.teacherEdit)
router.get('/teacher/:id', authenticatedUser, courseController.teacherPage)
router.get('/home', authenticatedUser, courseController.home)
router.get('/', (req, res) => res.redirect('/home'))

router.use('/', generalErrorHandler)
/******************************************************** */
module.exports = router
