const cartModel = require("../model/cart.model")
const handlerAsync = require("./handlerAsync")


module.exports = handlerAsync( async (req,res,next) =>{
    const cartFound = await cartModel.findOne({
        userId:req.user._id,
    })

    if(!cartFound || cartFound.products.length == 0){
        return next(new Error('You Don\'t have Any Cart'))
    }
    req.myCart = cartFound;
    next();
})