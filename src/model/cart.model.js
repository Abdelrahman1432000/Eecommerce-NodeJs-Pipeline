const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'Cart Must have CartId'],
        unique:true
    },
    totalPrice:{
        type:Number,
        min:1
    },
    totalAfterDiscount:{
        type:Number,
        min:0
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
    }]

});


const cartModel = mongoose.model('cart',cartSchema);

module.exports = cartModel;