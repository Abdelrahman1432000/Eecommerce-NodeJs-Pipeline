const Joi = require('joi')
const handlerAsync = require("../middleware/handlerAsync")

/*****AddProduct****/

const addProduct = Joi.object({
    name:Joi.string().required(),
    priceBeforeDiscount: Joi.number().min(1).required(),
    category: Joi.string().hex().required()
});

exports.addProductValidate = handlerAsync(async (req,res,next)=>{
    const { errror } = addProduct.validate(req.body)
    if(errror) return next(new Error(errror))
    next();
});

/***** Update Product****** */
const updateProduct = Joi.object({
    name:Joi.string(),
    priceBeforeDiscount: Joi.number().min(1),
    category: Joi.string().hex(),
    stock: Joi.number().min(1)
});

exports.updateProductValidate = handlerAsync(async (req,res,next)=>{
    const { errror } = updateProduct.validate(req.body)
    if(errror) return next(new Error(errror))
    next();
});