const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const courseController = require('../../controllers/pages/lesson-controller')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth.js')
const passport = require('passport')
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

router.get('/course', authenticated, courseController.applyPage)
router.get('/home', authenticated, courseController.home)
router.get('/', (req, res) => res.redirect('/home'))
/******************************************************** */
module.exports = router
