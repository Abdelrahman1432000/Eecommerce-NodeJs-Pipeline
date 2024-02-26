const express = require('express')

const authController = require('../controller/auth.controller')
const couponController = require('../controller/coupon.controller')

const couponRouter = express.Router();


couponRouter.route('/coupons')
.post(authController.auth,authController.adminOnly,couponController.addCoupon)
.get(authController.auth,authController.adminOnly,couponController.getAllCoupon)



module.exports = couponRouter;