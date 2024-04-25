const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/pages/admin-controller')
/********************************************************************** */
router.get('/users', adminController.adminUsers)
/********************************************************************** */
module.exports = router
