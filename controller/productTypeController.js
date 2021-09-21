const { createSuccessResponse, createErrorResponse } = require('../helper/errorhandler');
const productTypeModel = require('../models/productType');

//create productType
exports.createProductType = async (req, res, next) => {
    try {
        productTypeModel.findOne({ productType: req.body.productType }, async (err, productType) => {
            if (productType) {
                return createErrorResponse(req, res, "productType is already exist", { productType: "productType is already exist" }, 422);
            }
            if (!err) {
                const productTypeData = new productTypeModel(req.body);
                await productTypeData.save()

                const responseData = { productType: req.body.productType }
                return createSuccessResponse(res, "ProductType created Sucessfully", responseData, 200)
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

//getAll ProductType
exports.getAllProductType = async (req, res) => {
    productTypeModel.find((err, response) => {
        if (err) {
            const message = "Get ProductType Failed";
            return createErrorResponse(req, res, message, err, 422);
        } else {
            return createSuccessResponse(res, "All ProductType", response, 200)
        }
    })
}