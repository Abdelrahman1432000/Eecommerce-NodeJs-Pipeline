const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,'User Must have Name']
    },
    email:{
        type:String,
        required:[true,'User must have Email'],
        validate:{
            validator:validator.isEmail,
            message: 'please provide vaild Email'
        },
        unique:true,
        lower:true
    },
    password:{
        type:String,
        minlength:6,
        required:[true,'please provide Password'],
        select:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    address:Array,
    resetPassword:String,
    emailVerified:String,
    isActive:{
        type:Boolean,
        default:true
    }
})



userSchema.methods.createTokenForVerify = function(){
    const token = crypto.randomBytes(32).toString('hex')
    registerUser.emailVerified = token;
    registerUser.save();
    return token;

}

userSchema.methods.verifyPasswordHased = async function(password){
    return await bcrypt.compare(password.toString(),this.password);
}


const userModel = mongoose.model('user',userSchema);

module.exports = userModel

