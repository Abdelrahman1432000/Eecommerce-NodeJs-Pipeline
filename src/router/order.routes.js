const express = require('express');
const authController = require('../controller/auth.controller')
const orderController = require('../controller/order.controller')
const checkCartNotFound  = require('../middleware/checkCartNotFound')
const orderRouter = express.Router();


orderRouter.use(authController.auth);

orderRouter.post('/cash-order',checkCartNotFound,orderController.cashOnDelivery);
orderRouter.post('/online-payment',checkCartNotFound,orderController.paymentStripe);


module.exports = orderRouter