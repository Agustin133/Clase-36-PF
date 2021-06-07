const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const accessTokenValidator = require('../../../private_modules/validators/accessTokenValidator');

router
    .route('/:id')
    .get(accessTokenValidator.verifyToken,productController.getById);

router
    .route('/')
    .get(productController.getAll);

router
    .route('/')
    .post(accessTokenValidator.verifyToken,productController.addProduct);

router
    .route('/:id')
    .put(accessTokenValidator.verifyToken,productController.update);

router
    .route('/:id')
    .delete(accessTokenValidator.verifyToken,productController.deleteProduct);

router
    .route('/find/:data')
    .get(accessTokenValidator.verifyToken,productController.getProductByFilter);

router
    .route('/price/:num1/:num2')
    .get(accessTokenValidator.verifyToken,productController.getPiceByFilter);

module.exports = router;