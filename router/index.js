const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const productTypeController = require('../controller/productTypeController');
const productController = require('../controller/productController');
const checkAuth = require('../authentication/checkAuth');

const { validateRegisterSchema } = require('../validation/registerSchemaValidation');
const { loginUser } = require('../validation/loginValidation');
const { createProductType } = require('../validation/createProductType');
const { validateProductSchema } = require('../validation/createProduct');


//user route
router.post('/signup', validateRegisterSchema, userController.signup);

router.post('/login', loginUser, userController.login);

//productType route
router.post('/createProductType', checkAuth, createProductType, productTypeController.createProductType);

router.get('/getAllProductType', productTypeController.getAllProductType);

//product route
router.post('/createProduct', checkAuth, validateProductSchema, productController.createProduct);

router.get('/getAllProduct', productController.getAllProduct);

router.delete('/deleteProduct/:id', checkAuth, productController.deleteProduct);

router.patch('/updateProduct/:id', checkAuth, productController.updateProduct);

router.get('/getProductByType', productController.getProductByType);

router.get('/getRecentProduct', productController.getRecentProduct);

router.get('/mostLikeProduct', productController.mostLikeProduct);

router.post('/commentProduct/:id', productController.commentProduct);

router.post('/likeDislike/:id', productController.likeDislikeProduct);

module.exports = router;