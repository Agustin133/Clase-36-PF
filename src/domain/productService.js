const { response } = require("express");
const moment = require('moment');
const {options} = require('../infrastructure/services/mariaDB');
const knex = require('knex')(options);
const log4js = require('../../private_modules/default/logerHandler/log4js');

const logger = log4js.log();
const loggerConsole = logger.getLogger()
const loggerErr = logger.getLogger('fileErr');

async function getProductById(id) {
    try {
        const response = await knex.from('product').select('*').where('id',id);
        return response[0];
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;   
    }
}

async function getAll() {
    try {
        const response = await knex.from('product').select('*');
        return response;
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function getProductByFilter(data) {
    try {
        const response = await knex.from('product').select('*').where('title',data);
        return response[0];
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function getPriceByFilter(price1,price2) {
    try {
        const response = await knex.from('product').select('*')
        .where('price', '>=', parseInt(price1))
        .andWhere('price','<=', parseInt(price2));
    return response;
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function addProduct(body) {
    let timestamp = moment().format('lll');
    const { title, price, thumbnail, code, stock, description } = body;
    const item = {
        title,
        price,
        stock,
        code,
        thumbnail,
        timestamp,
        description
    }
    try {
        await knex('product').insert(item);
        return 'product added successfully';
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function update(id,body) {
    try{
        await knex('product').where('id',id).update(body);
        return 'Product uploaded successfully';
    }catch(err){
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function deleteProduct(id) {
    try{
        await knex('product').where('id',id).del();
        return 'Product deleted successfully';
    }catch(err){
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

module.exports = {
    getProductById,
    getAll,
    addProduct,
    update,
    getProductByFilter,
    getPriceByFilter,
    deleteProduct
}