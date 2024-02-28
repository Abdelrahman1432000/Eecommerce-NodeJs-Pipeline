const stripe = require('stripe')(process.env.YOUR_STRIPE_SECRET_KEY);

const handlerAsync = require("../middleware/handlerAsync");
const orderModel = require("../model/order.model");
const cartModel = require("../model/cart.model")



const removeAuthCart = async (cartId) => {
    await cartModel.findByIdAndDelete(cartId);
}
exports.cashOnDelivery = handlerAsync(async (req,res,next)=>{
    const order = await orderModel.create({
        userId: req.user._id,
        products:req.myCart.products,
        OrderPrice: req.myCart.totalAfterDiscount || req.myCart.totalPrice,
    });
    removeAuthCart(req.myCart._id);
    res.status(201).json({
        message: "Order Created Successfully",
        order
    })
});


exports.paymentStripe = handlerAsync(async (req,res,next) => {
    let finalPriceOrder = req.myCart.totalAfterDiscount || req.myCart.totalPrice;

    const charge = await stripe.charges.create({
        amount: finalPriceOrder*100,
        currency: 'usd',
        source:'pk_test_51LLz9cLrwe8Bq6ngouqbEWk81VsvyqbARj5mmMwPcbsEJDZmqw9c3N2iCafUeLlvrIIBbEwwdTFtPJ1pGCrFvqQt00AYkoKL9P',
        description: 'Example charge',
    });

    const order = await orderModel.create({
        userId: req.user._id,
        products:req.myCart.products,
        OrderPrice: finalPriceOrder,
        charge
    });
    removeAuthCart(req.myCart._id);
    res.status(201).json({
        message: "payment Successfully",
        order,
        charge: charge.id
    })
});