const express = require('express')

const matchPassword = require('../middleware/matchPassword')
const authController = require('../controller/auth.controller')

const authRouter = express.Router()

authRouter.post('/register',matchPassword,authController.register);
authRouter.get('/verify/:token',authController.verifyAccount);
authRouter.post('/login',authController.login);
authRouter.post('/forget-password',authController.forgetPassword)
authRouter.post('/reset-password/:token',matchPassword,authController.resetPassword)

module.exports = authRouter








// userName, email, password (hashed), role, isVerfied, Adressed (user may have more that one address