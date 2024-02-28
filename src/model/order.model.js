const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,"Required User"]
    },
    products:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:'product',
        },
        quantity:{
            type:Number,
            default:1,
            min:1
        }
    }],
    OrderPrice:{
        type:Number,
        min:0
    },
    currency:{
        type:String,
        default:'usd'
    },
    token:{
        type:String
    }
},{
    timestamps: true
});

const orderModel = mongoose.model('order',orderSchema)

module.exports = orderModel;