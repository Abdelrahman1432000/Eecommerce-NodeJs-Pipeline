const express = require('express')

const authController = require('../controller/auth.controller')
const couponController = require('../controller/coupon.controller')
const couponValidate = require('../helper/coupon.validation');
const couponRouter = express.Router();


couponRouter.post('/apply-coupon',couponController.applyCouponToProduct)


couponRouter.use(authController.auth,authController.adminOnly)

couponRouter.route('/coupons')
.post(couponValidate.addCouponValidate,couponController.addCoupon)
.get(couponController.getAllCoupon)

couponRouter.route('/coupons/:id')
.put(couponValidate.UpdateCouponValidate,couponController.updateCoupon)
.delete(couponController.deleteCoupon)




module.exports = couponRouter;