const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todos')

router.get('/cards', todoController.getAllCards)
router.post('/card', todoController.createCard)
router.patch('/card', todoController.updateCard)
router.delete('/card', todoController.removeCard)

module.exports = router
