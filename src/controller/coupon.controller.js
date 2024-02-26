const handlerAsync = require('../middleware/handlerAsync')
const couponModel = require('../model/coupon.model')

exports.addCoupon = handlerAsync(async (req,res,next)=>{
    const coupon = await couponModel.create({
        code:req.body.code,
        value:req.body.value,
        expireIn:req.body.expireIn,
        createdBy:req.user._id
    })

    res.status(201).json({
        message:"Coupon Created",
        coupon
    });
})

exports.getAllCoupon = handlerAsync(async (req,res,next)=>{

    const coupons = await couponModel.find().populate('createdBy')

    res.json({
        data:{
            coupons
        }
    })
})