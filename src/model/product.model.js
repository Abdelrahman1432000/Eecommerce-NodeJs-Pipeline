const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product must have Name'],
        unique:true
    },
    slug:String,
    priceBeforeDiscount:{
        type:Number,
        min:1
    },
    finalPrice:{
        type:Number,
        validate:{
            validator:function(v){
                return v < this.priceBeforeDiscount
            },
            message: "finalPrice is greater than priceBeforeDiscount"
        }
    },
    images:Array,
    category:{
        type:mongoose.Types.ObjectId,
        ref:'categoryModel'
    }
})

const productModel = mongoose.model('product',productSchema);

module.exports = productModel;
// Product schema (productName, slug, priceAfterDiscount, finalPrice, image, category, stock)