const handlerAsync = require("./handlerAsync")
const couponModel = require("../model/coupon.model");
const cartModel = require('../model/cart.model')

module.exports = handlerAsync( async (req,res,next) =>{
    const couponCode = req.body.couponCode;

    const coupon = await couponModel.findOne({
        code:couponCode
    });

    if(coupon.products.length > 0){
        return next(new Error('this Coupon is Apply on product'));
    }
    if(coupon.expireIn < Date.now()){
        return next(new Error("This Coupon is Expired"));
    }


    const myCart = await cartModel.findOne({
        userId:req.user._id
    });

    const found = coupon.carts.includes(myCart._id)
    
    if(found){
        return next(new Error("this Coupon is Apply to your cart Before "))
    }
    next();
})