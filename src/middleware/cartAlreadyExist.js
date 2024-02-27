const cartModel = require("../model/cart.model")
const handlerAsync = require("./handlerAsync")


module.exports = handlerAsync( async (req,res,next) =>{
    const cartFound = await cartModel.findOne({
        userId:req.user._id,
    })

    if(cartFound){
        return next(new Error('Cart Already Exist'))
    }
    next();
})