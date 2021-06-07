const express = require('express');
const { route } = require('./products.route');
const router = new express.Router();
const productsRoute = require('./products.route');
const cartRoute = require('./carts.route');
const userRoute = require('./user.route');

router.use('/api/products', productsRoute);
router.use('/api/cart', cartRoute);
router.use('/api/user', userRoute);

module.exports = router;