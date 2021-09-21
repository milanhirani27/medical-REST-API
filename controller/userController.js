const usermodel = require('../models/user');
const jwt = require('jsonwebtoken');

const { createSuccessResponse, createErrorResponse } = require('../helper/errorhandler');

//user Register
exports.signup = async (req, res, next) => {
    try {
        usermodel.findOne({ email: req.body.email }, async (err, user) => {
            if (user) {
                return createErrorResponse(req, res, "email is already exist", { email: "email is already exist" }, 422);
            } else {
                usermodel.findOne({ mobile: req.body.mobile }, async (err, user) => {
                    if (user) {
                        return createErrorResponse(req, res, "mobile is already exist", { email: "mobile is already exist" }, 422);
                    }
                    if (!err) {
                        const userData = new usermodel(req.body);
                        const mobileNum = req.body.mobile;
                        if (mobileNum.length != 10) {
                            return createErrorResponse(req, res, "valid mobile no is required", { mobile: "Please enter 10 digit mobile no:" }, 422);
                        }
                        await userData.save();
                        const { name, email, mobile, createdDate } = userData;
                        const responseData = { name, email, mobile, createdDate }
                        return createSuccessResponse(res, "User Registration Sucessfully", responseData, 200);
                    } else {
                        message = 'please required below field'
                        var errors = {};
                        for (i in error.errors) {
                            errors[i] = error.errors[i].message;
                        }
                        return createErrorResponse(req, res, message, errors, 422);
                    }
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
}

//user Login
exports.login = async (req, res, next) => {
    try {
        const enterEmail = req.body.email;
        const enterPassword = req.body.password;
        const user = await usermodel.findOne({ email: enterEmail, password: enterPassword });
        if (user) {
            const token = jwt.sign({ _id: user._id.toString() }, 'tokengeneration');
            user.updatedDate = Date.now(),
                user.token = token,
                user.save()
            const { name, email, mobile, createdDate, updatedDate } = user
            const responseData = { name, email, mobile, createdDate, updatedDate, token }
            return createSuccessResponse(res, "User Login Sucessfully", responseData, 200);
        } else {
            return createErrorResponse(req, res, "Invalid email & password", { error: "Invalid cradinality" }, 422);
        }
    }
    catch (error) {
        next(error)
    }
}
