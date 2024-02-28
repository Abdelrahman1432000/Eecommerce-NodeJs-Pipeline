const Joi = require('joi')
const handlerAsync = require("../middleware/handlerAsync")

/*******AddCategory*** */

const addCategory = Joi.object({
    image:Joi.string().required(),
    name:Joi.string().required()
})


exports.addCategory = handlerAsync(async (req,res,next)=>{
    const { errror } = addCategory.validate(req.body)
    if(errror) return next(new Error(errror))
    next();
});


/*********Update Category********** */

const updateCategory = Joi.object({
    image:Joi.string(),
    name:Joi.string()
})


exports.updateCategory = handlerAsync(async (req,res,next)=>{
    const { errror } = updateCategory.validate(req.body)
    if(errror) return next(new Error(errror))
    next();
});