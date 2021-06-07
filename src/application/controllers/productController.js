const productService = require('../../domain/productService');

async function getById(req, res) {
    const id = req.params.id;
    const response = await productService.getProductById(id);
    res.json(response);
}

async function getAll(req, res) {
    const response = await productService.getAll();
    res.json(response);
}

async function addProduct(req,res) {
    const body = req.body;
    const response = await productService.addProduct(body);
    res.json(response);
}

async function update(req,res) {
    const id = req.params.id;
    const body = req.body;
    const response = await productService.update(id,body);
    res.json(response);
}

async function deleteProduct(req,res) {
    const id = req.params.id;
    const response =await productService.deleteProduct(id);
    res.json(response);
}

async function getProductByFilter(req, res) {
    const data = req.params.data;
    const response = await productService.getProductByFilter(data);
    res.json(response);
}

async function getPiceByFilter(req, res) {
    const price1 = req.params.num1;
    const price2 = req.params.num2;
    const response = await productService.getPriceByFilter(price1,price2);
    res.json(response);
}

module.exports = {
    getById,
    getAll,
    addProduct,
    update,
    getProductByFilter,
    getPiceByFilter,
    deleteProduct
}