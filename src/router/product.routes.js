const productController = require('../controller/product.controller')
const authController = require('../controller/auth.controller')

const express = require('express')

const productRouter = express.Router();

productRouter.route('/products')
.post(authController.auth,
    authController.adminOnly,
    productController.uploadArrayofImage,
    productController.addProduct)


module.exports = productRouter