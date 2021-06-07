const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accessTokenValidator = require('../../../private_modules/validators/accessTokenValidator');

router
    .route('/login')
    .post(userController.logIn);

router  
    .route('/register')
    .post(accessTokenValidator.verifyToken,userController.register);

router  
    .route('/password/:password').get(userController.password);

module.exports = router;