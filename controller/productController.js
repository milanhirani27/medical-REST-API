const productModel = require('../models/product');
const { createSuccessResponse, createErrorResponse } = require('../helper/errorhandler');

//create Product
exports.createProduct = async (req, res) => {
    try {
        productModel.findOne({ productName: req.body.productName }, async (err, product) => {
            if (product) {
                return createErrorResponse(req, res, "This product is already exist", { product: "Product is already exist" }, 422);
            }
            if (!err) {
                const productData = new productModel(req.body);
                await productData.save()

                const { productType, productName, expiryDate, price, likes, date } = productData
                const responseData = { productType, productName, expiryDate, price, likes, date }
                return createSuccessResponse(res, "Product created Sucessfully", responseData, 200);
            } else {
                message = 'please required below field'
                var errors = {};
                for (i in error.errors) {
                    errors[i] = error.errors[i].message;
                }
                return createErrorResponse(req, res, message, errors, 422);
            }
        })
    } catch (error) {
        next(error);
    }
}

//getAll product
exports.getAllProduct = async (req, res) => {
    productModel.find((err, response) => {
        if (err) {
            const message = "Get Product Failed";
            return createErrorResponse(req, res, message, err, 422);
        } else {
            return createSuccessResponse(res, "All Product", response, 200)
        }
    })
}

//delete product
exports.deleteProduct = async (req, res) => {
    productModel.findByIdAndDelete(id = req.params.id, (err, product) => {
        if (err) {
            console.log(err)
        } else {
            return createSuccessResponse(res, "Product Delete Sucessfully", product, 200)
        }
    })
}

//update product
exports.updateProduct = async (req, res) => {
    productModel.findByIdAndUpdate(id = req.params.id, req.body, { new: true }, (err, product) => {
        if (err) {
            console.log(err)
        } else {
            return createSuccessResponse(res, "Product updated Sucessfully", product, 200)
        }
    })
}

//get product by product type
exports.getProductByType = async (req, res) => {
    productType = req.body.productType,
        productModel.find({ productType: productType }, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                return createSuccessResponse(res, "All Product by products types", response, 200)
            }
        })
}

//get recent product
exports.getRecentProduct = async (req, res) => {
    productModel.findOne().sort('-created_at').exec(function (err, response) {
        return createSuccessResponse(res, "Most Recent Product", response, 200)
    });
}

//get most like product
exports.mostLikeProduct = async (req, res) => {
    productModel.findOne().sort({ likes: -1 }).limit(1).exec(function (err, response) {
        return createSuccessResponse(res, "Most Likes Product", response, 200)
    })
}

//comment product
exports.commentProduct = async (req, res, next) => {
    try {
        const comments = req.body.comments;
        const productData = await productModel.findById(id = req.params.id);
        if (productData) {
            productData.comments = comments;
            productData.save();
            const { productType, productName, expiryDate, price, likes, date } = productData
            const response = { productType, productName, expiryDate, price, likes, date, comments};
            return createSuccessResponse(res, "Comments on Product", response, 200)
        }
    } catch (error) {
        next(error)
    }
}

//Like/Dislike a product
exports.likeDislikeProduct = async (req, res) => {
    try {
        if (req.query.like === 'true') {
            await productModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } }, { 'new': true }).exec(function (err, response) {
                return createSuccessResponse(res, "like Product Sucessfully", response, 200)
            })
        }
        else if (req.query.like === 'false') {
            await productModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 } }, { 'new': true }).exec(function (err, response) {
                return createSuccessResponse(res, "Dislike Product Sucessfully", response, 200)
            })
        }
        else {
            return createSuccessResponse(res, "Please Like and Dislike Product", [], 200)
        }
    } catch (e) {
        res.status(400).send(e)
    }

}