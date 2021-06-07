const cartService = require('../../domain/cartService');

async function getById(req, res) {
    const id = req.params.id;
    const response = await cartService.getProductById(id);
    res.json(response);
}

async function getAll(req, res) {
    const response = await cartService.getAll();
    res.json(response);
}

async function addProduct(req,res) {
    const body = req.body;
    const response = await cartService.addProduct(body);
    res.json(response);
}

async function deleteProduct(req,res) {
    const userId = req.params.userId
    const id = req.params.id;
    const response = await cartService.deleteProduct(id, userId);
    res.json(response);
}

module.exports = {
    getById,
    getAll,
    addProduct,
    deleteProduct
}