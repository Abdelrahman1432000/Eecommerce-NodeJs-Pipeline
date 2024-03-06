const productController = require('../controller/product.controller')
const authController = require('../controller/auth.controller')
const productValidate= require('../helper/product.validation');

const express = require('express');

const productRouter = express.Router();


productRouter.get('/products/:id',productController.getProductById);
productRouter.get('/products/:catId/category',productController.getProductsByCategoryId);


productRouter.route('/products')
.post(authController.auth,
    authController.adminOnly,
    productValidate.addProductValidate,
    productController.uploadMutipleImage,
    productController.addProduct)
.get(productController.getAllProduct)

productRouter.route('/products/:id')
.put(authController.auth,
    authController.adminOnly,
    productValidate.updateProductValidate,
    productController.uploadMutipleImage,
    productController.updateProduct)
.delete(authController.auth,
    authController.adminOnly,
    productController.deleteProduct)


module.exports = productRouter