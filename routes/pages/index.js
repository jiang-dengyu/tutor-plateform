const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
const lessonController = require('../../controllers/pages/lesson-controller')
const { authenticated } = require('../../middleware/auth.js')
const passport = require('passport')
/********************************** */
router.get('/signUp', userController.signUpPage)
router.post('/signUp', userController.signUp)
router.get('/signIn', userController.signInPage)
router.post('/signIn', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logOut', userController.logOut)
router.get('/home', authenticated, lessonController.home)
router.get('/', (req, res) => res.redirect('/signIn'))
/******************************************************** */
module.exports = router
