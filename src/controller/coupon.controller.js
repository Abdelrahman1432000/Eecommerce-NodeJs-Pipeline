const handlerAsync = require("../middleware/handlerAsync");
const couponModel = require("../model/coupon.model");
const productModel = require("../model/product.model");

exports.addCoupon = handlerAsync(async (req, res, next) => {
    const coupon = await couponModel.create({
        code: req.body.code,
        value: req.body.value,
        expireIn: req.body.expireIn,
        createdBy: req.user._id,
    });

    res.status(201).json({
        message: "Coupon Created",
        coupon,
    });
});

exports.getAllCoupon = handlerAsync(async (req, res, next) => {
    const coupons = await couponModel
        .find()
        .populate("createdBy", "userName email _id")
        .populate('products','name');

    res.json({
        data: {
            length: coupons.length,
            coupons,
        },
    });
});

exports.updateCoupon = handlerAsync(async (req, res, next) => {
    const coupon = await couponModel.findByIdAndUpdate(
        req.params.id, {
            code: req.body.code,
            value: req.body.value,
            expireIn: req.body.expireIn,
            updatedBy: req.user._id,
        }, {
            runValidators: true,
            new: true,
        }
    );

    res.status(202).json({
        coupon,
    });
});

exports.deleteCoupon = handlerAsync(async (req, res, next) => {
    await couponModel.findByIdAndDelete(req.params.id);
    res.status(204).json({});
});

exports.applyCouponToProduct = handlerAsync(async (req, res, next) => {
    const {
        productId,
        couponCode
    } = req.body;

    let addedBefore, isExpired;

    const oldProduct = await productModel.findById(productId);
    const oldCoupon = await couponModel.findOne({
        code: couponCode
    })

    oldCoupon.products.forEach(element => {
        if (element == productId) {
            addedBefore = true;
        }
    });

    if(oldCoupon.expireIn < Date.now()){
        isExpired = true
    }
    let coupon, product;
    if (!addedBefore && !isExpired) {
        coupon = await couponModel.findOneAndUpdate({
            code: couponCode
        }, {
            $push: {
                'products': productId
            }
        }, {
            runValidators: true,
            new: true,
        })
        product = await productModel.findByIdAndUpdate(productId,{
            finalPrice: oldProduct.priceBeforeDiscount - coupon.value
        }, {
            runValidators: true,
            new: true,
        })
        console.log(product);
    } else {
        return next(new Error('This Coupon Apply to product Before Or Is Expired'))
    }

    res.json({
        message: `Apply Coupon ${coupon.code} to  ${product.name}`
    });
});