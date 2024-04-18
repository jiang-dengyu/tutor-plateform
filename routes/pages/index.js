const express = require('express')
const router = express.Router()
const userController = require('../../controllers/pages/user-controller')
/********************************** */
router.get('/signUp', userController.signUpPage)
router.post('/signUp', userController.signUp)
router.get('/signIn', userController.signInPage)
router.post('/signIn', userController.signIn)

router.get('/', (req, res) => res.render('home'))
/******************************************************** */
module.exports = router
