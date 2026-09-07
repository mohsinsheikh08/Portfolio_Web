const express = require('express')
const messageController = require('../controller/message.controller')
const tokenChecker = require('../middleware/tokenchecker.middleware')
const router = express.Router()


router.post('/send-message', messageController.sendMessage)

router.get('/get-messages', tokenChecker, messageController.getMessage)

router.delete('/:id', tokenChecker, messageController.deleteMessage)

module.exports = router