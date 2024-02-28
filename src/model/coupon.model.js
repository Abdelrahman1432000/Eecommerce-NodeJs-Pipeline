const mongoose = require("mongoose");


const couponSchema = mongoose.Schema({
    code:{
        type:String,
        upper:true,
        minlength:5,
        requrired:[true,'Coupon Must have Code'],
        unique:true
    },
    value:{
        type:Number,
        min:1,
        default:1
    },
    expireIn:{
        type:Date,
        min:Date.now(),
        required:[true,'Coupon must have ExpireIn']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    products:[
        {
            type:mongoose.Types.ObjectId,
            ref:'product'
        }
    ],
    carts:[
        {
            type:mongoose.Types.ObjectId,
            ref:'cart'
        }
    ]
},{

});

const couponModel = mongoose.model('coupon',couponSchema);


module.exports = couponModel;



// • Coupon schema (couponCode, value, createdBy, updatedBy, deletedBy, expireIn)