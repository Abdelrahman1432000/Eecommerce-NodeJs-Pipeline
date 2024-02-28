const Joi = require('joi')
const handlerAsync = require("../middleware/handlerAsync")


/******Add CouponValidated***** */
const addCoupon = Joi.object({
    code: Joi.string().required(),
    value: Joi.number().min(1).required(),
    expireIn: Joi.date().greater('now').required()
})

exports.addCouponValidate = handlerAsync(async(req,res,next)=>{
    const { errror } = addCoupon.validate(req.body)
    if(errror) return next(new Error(errror))
    next();
});

/******Update CouponValidated******/

const UpdateCoupon = Joi.object({
    code: Joi.string(),
    value: Joi.number().min(1),
    expireIn: Joi.date().greater('now'),
})

exports.UpdateCouponValidate = handlerAsync(async(req,res,next)=>{
    const { errror } = UpdateCoupon.validate(req.body)
    if(errror) return next(new Error(errror))
    next();
});
