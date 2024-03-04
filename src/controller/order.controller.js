const Stripe = require('stripe');
const stripe = new Stripe("sk_test_51LLz9cLrwe8Bq6ng5FCmUbUX1VtYqRuSRYNU8696U3f6E7ZMLNHC0tXjfzJlLF4kGABUjLtwEH8PwLHFzaEfMgSM00YOUTpshf");

const handlerAsync = require("../middleware/handlerAsync");
const orderModel = require("../model/order.model");
const cartModel = require("../model/cart.model");
const productModel = require('../model/product.model');


const removeAuthCart = async (cartId) => {
    await cartModel.findByIdAndDelete(cartId);
}

const decreaseFromStock = async (productId,quantity) => {
    const product = await productModel.findById(productId);
    product.stock -= quantity;
    product.save();
}
exports.cashOnDelivery = handlerAsync(async (req,res,next)=>{
    const order = await orderModel.create({
        userId: req.user._id,
        products:req.myCart.products,
        OrderPrice: req.myCart.totalAfterDiscount || req.myCart.totalPrice,
    });
    req.myCart.products.forEach((ele) => {
        decreaseFromStock(ele.product,ele.quantity);
    })
    removeAuthCart(req.myCart._id);
    res.status(201).json({
        message: "Order Created Successfully",
        order
    })
});


exports.paymentStripe = handlerAsync(async (req,res,next) => {
    let finalPriceOrder = req.myCart.totalAfterDiscount || req.myCart.totalPrice;

    const price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: finalPriceOrder * 100,
        product_data: {
          name: 'Gold Plan',
        },
    });
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
                price: price.id,
                quantity:1
            },
        ],

        mode: "payment",
        customer_email: req.user.email,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        client_reference_id: req.user._id
      });


    const order = await orderModel.create({
        userId: req.user._id,
        products:req.myCart.products,
        OrderPrice: finalPriceOrder,
    });
    removeAuthCart(req.myCart._id);
    res.status(201).json({
        message: "payment Successfully",
        order,
        session
    })
});