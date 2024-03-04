const Joi = require('joi')
const handlerAsync = require("../middleware/handlerAsync")

/******Update User Data****** */
const updateUser =  Joi.object({
    userName: Joi.string().min(3),
    role: Joi.any().valid('admin','user'),
    address: Joi.array().items(Joi.string().required()),
    userId: Joi.string().hex(),
    isActive: Joi.boolean()
})

exports.updateUser = handlerAsync(async (req,res,next) => {
    const {error} = await updateUser.validate(req.body)
    if(error) return next(new Error(error))
    next();
});

/****Register **** */

const Register = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    address: Joi.array().items(Joi.string().required()),
});

exports.RegisterValidate = handlerAsync(async (req,res,next) => {
    const {error} = await Register.validate(req.body)
    if(error) return next(new Error(error))
    next();
});
/*****Login***** */
const Login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.loginValidate = handlerAsync(async (req,res,next) => {
    const {error} = await Login.validate(req.body)
    if(error) return next(new Error(error))
    next();
});


/**********Forget Password********** */
const forgetPassword = Joi.object({
    email: Joi.string().email().required(),
});

exports.forgetValidate = handlerAsync(async (req,res,next) => {
    const {error} = await forgetPassword.validate(req.body)
    if(error) return next(new Error(error))
    next();
});


/*******Reset Password****** */

const resetPassword = Joi.object({
    password: Joi.string().required(),
    password_confirmation: Joi.ref('password')
}).with('password','password_confirmation');

exports.resetValidate = handlerAsync(async (req,res,next) => {
    const {error} = await resetPassword.validate(req.body)
    if(error) return next(new Error(error))
    next();
});

