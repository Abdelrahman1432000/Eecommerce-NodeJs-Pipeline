const express = require('express')

const authController = require('../controller/auth.controller')
const mustBeUser = require('../middleware/mustBeUser')
const userValidation = require('../helper/user.validations')

const authRouter = express.Router()

authRouter.post('/register',
userValidation.RegisterValidate,
authController.register);

authRouter.get('/verify/:token',
authController.verifyAccount);

authRouter.post('/login',
userValidation.loginValidate,
authController.login);

authRouter.post('/forget-password',
userValidation.forgetValidate,
authController.forgetPassword)

authRouter.post('/reset-password/:token',
userValidation.resetValidate,
authController.resetPassword);

authRouter.put('/deactive-user',
authController.auth,
authController.adminOnly,
mustBeUser,
authController.deAactiveUser);

authRouter.put('/update-user',
authController.auth,
authController.adminOnly,
mustBeUser,
userValidation.updateUser,
authController.updateUser);

module.exports = authRouter








// userName, email, password (hashed), role, isVerfied, Adressed (user may have more that one address