const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const accessTokenValidator = require('../../../private_modules/validators/accessTokenValidator');

router
    .route('/:id')
    .get(accessTokenValidator.verifyToken,cartController.getById);

router
    .route('/')
    .get(accessTokenValidator.verifyToken,cartController.getAll);

router
    .route('/')
    .post(accessTokenValidator.verifyToken,cartController.addProduct);

router
    .route('/:id/:userId')
    .delete(accessTokenValidator.verifyToken,cartController.deleteProduct);


module.exports = router;