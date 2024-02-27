const handlerAsync = require("../middleware/handlerAsync");
const cartModel = require('../model/cart.model')
const productModel = require('../model/product.model')
exports.addCart = handlerAsync(async (req,res,next)=>{
    const {productId, quantity} = req.body;
    const product = await productModel.findById(productId)
    console.log(product.stock, quantity)
    if(quantity > product.stock){
        return next(new Error('quantity is greater than stock'))
    }
    const cart =  await cartModel.create({
        userId:req.user._id
    });

    let addToTotalPrice = (product.finalPrice || product.priceBeforeDiscount) * (quantity || 1);
    let obj = {
        product:productId,
        quantity
    }
    const updateCart = await cartModel.findByIdAndUpdate(cart._id,{
        $push: {
            'products':obj
        },
        totalPrice: cart.totalPrice || 0 + addToTotalPrice,
    },{new:true})
    res.json({
        message :"Cart Created",
        cartInfo: updateCart
    })
});


exports.updateCart = handlerAsync(async (req,res,next)=>{
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1
    let overflowQuantity = false;
    const cart = await cartModel.findOne({
        userId:req.user._id
    })

    if(!cart){
        return next(new Error('you should Create cart first'))
    }

    //check if product is found or not
    cart.products.map((ele)=>{
        if(ele.product == productId){
            const product =  productModel.findById(productId);
            if((ele.quantity + quantity) < product.stock){
                ele.quantity = ele.quantity + quantity;
            }else{
                overflowQuantity = true;
                return next(new Error('You Order more than in Stock'))
            }
        }
    })

    let addToTotalPrice;
    if(!overflowQuantity){
        let obj = {
            product: productId,
            quantity
        }
        cart.products.push(obj);
    }

    const product = await productModel.findById(productId)
    addToTotalPrice = (product.finalPrice || product.priceBeforeDiscount) * quantity ;


    await cartModel.findByIdAndUpdate(cart._id,{
        products:cart.products,
        totalPrice: cart.totalPrice + addToTotalPrice
    })


    res.json({
        message : "Updated Cart Successfully"
    })

});