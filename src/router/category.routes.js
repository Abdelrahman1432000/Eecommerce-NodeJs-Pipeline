const express = require('express')
const categoryController = require('../controller/category.controller')
const authController = require('../controller/auth.controller')
const categroyRouter = express.Router();


categroyRouter.route('/categories')
    .post(authController.auth, categoryController.uploadImage, categoryController.addCateogry)
    .get(categoryController.getAllCategory);

categroyRouter.route('/categories/:id')
    .get(categoryController.getSpecificCategory)
    .put(authController.auth,
        authController.adminOnly,
        categoryController.uploadImage,
        categoryController.updateCategory)
    .delete(authController.auth,
        authController.adminOnly,
        categoryController.deleteCategory)
module.exports = categroyRouter