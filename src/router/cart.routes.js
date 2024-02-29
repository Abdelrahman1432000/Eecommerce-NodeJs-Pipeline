const express = require('express');
const authController = require('../controller/auth.controller')
const cartController = require('../controller/cart.controller');
const cartAlreadyExist = require('../middleware/cartAlreadyExist');
const checkCartCoupon = require('../middleware/checkCartCoupon');

const cartRouter = express.Router();

cartRouter.use(authController.auth)

cartRouter.post('/apply-coupon-cart',checkCartCoupon,cartController.applyCouponToCart)

cartRouter.route('/carts')
.post(cartAlreadyExist,cartController.addCart)
.put(cartController.updateCart)
.delete(cartController.deleteProductFromCart)
.get(cartController.getMyCart);

module.exports = cartRouter

