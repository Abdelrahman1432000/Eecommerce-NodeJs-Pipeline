const userModel = require("../model/user.model");
const handlerAsync = require("./handlerAsync")


module.exports = handlerAsync( async (req,res,next) =>{
    const userId = req.body.userId;
    const user = await userModel.findById(userId)
    if(user.role == 'admin'){
        return next(new Error("Can't deactive Admin User"))
    }
    next();
})