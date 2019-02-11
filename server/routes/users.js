const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router.post('/signup', userController.create)
router.post('/login', userController.authenticate)

module.exports = router
