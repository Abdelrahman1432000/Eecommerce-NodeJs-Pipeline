module.exports =  (req,res,next) => {
    if(req.body.password != req.body.password_confirmation){
        req.statusCodeError = 400
        return next(new Error("Password Dosn't Match"))
    }
    next();
}