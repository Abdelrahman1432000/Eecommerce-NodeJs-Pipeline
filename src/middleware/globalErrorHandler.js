module.exports = (err,req,res,next) => {
    const status = req.statusCodeError | 400
    res.status(status).json({
        error:{
            message: err.message,
            name:err.name,
            stack:err.stack
        }
    });
}