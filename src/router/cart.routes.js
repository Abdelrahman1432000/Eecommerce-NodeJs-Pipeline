const express = require('express');
const authController = require('../controller/auth.controller')
const cartController = require('../controller/cart.controller');
const cartAlreadyExist = require('../middleware/cartAlreadyExist');

const cartRouter = express.Router();

cartRouter.use(authController.auth)

cartRouter.route('/carts')
.post(cartAlreadyExist,cartController.addCart)
.put(cartController.updateCart)

module.exports = cartRouter

