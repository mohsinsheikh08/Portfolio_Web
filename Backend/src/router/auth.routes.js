const express = require('express');
const authController = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/register', authController.userRegister)

router.post('/login', authController.userLogin)

router.get('/logout', authController.userLogout)

router.get('/get-user', authController.getMe)

module.exports = router