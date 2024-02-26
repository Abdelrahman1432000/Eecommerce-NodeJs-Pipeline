const express = require('express')

const authController = require('../controller/auth.controller')
const couponController = require('../controller/coupon.controller')

const couponRouter = express.Router();




couponRouter.use(authController.auth,authController.adminOnly)

couponRouter.route('/coupons')
.post(couponController.addCoupon)
.get(couponController.getAllCoupon)

couponRouter.route('/coupons/:id')
.put(couponController.updateCoupon)
.delete(couponController.deleteCoupon)

couponRouter.post('/apply-coupon',couponController.applyCouponToProduct)



module.exports = couponRouter;