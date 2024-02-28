const mongoose = require('mongoose')
const slugify = require('slugify')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product must have Name'],
        unique:true
    },
    slug:String,
    priceBeforeDiscount:{
        type:Number,
        min:1,
        required:[true,'Product Must have a Price']
    },
    finalPrice:{
        type:Number,
        min:1
    },
    images:{
        type:Array,
        required:[true,'Must be upload Images'],
        min:1
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'categoryModel',
        required:[true,'Must be assign to Category']
    },
    stock:{
        type:Number,
        default:1
    },
})

productSchema.pre('save',function(next){
    if (this.isNew || this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true });
    }
    next()
})

productSchema.pre(/^findOneAndUpdate/,function(next){
    if(this._update.slug){
        this._update.slug = slugify(this._update.name,{lower:true})
    }
    next();
})


const productModel = mongoose.model('product',productSchema);

module.exports = productModel;
// Product schema (productName, slug, priceAfterDiscount, finalPrice, image, category, stock)