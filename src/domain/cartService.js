const { response } = require("express");
const moment  = require('moment');
const {options} = require('../infrastructure/services/mariaDB');
const knex = require('knex')(options);
const log4js = require('../../private_modules/default/logerHandler/log4js');

const logger = log4js.log();
const loggerConsole = logger.getLogger()
const loggerErr = logger.getLogger('fileErr');

async function getProductById(id) {
    try {
        const response = await knex.from('cart').select('*').where({user_id: id});
        return response;
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function getAll() {
    try {
        const response = await knex.from('cart').select('*');
        return response; 
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function addProduct(body) {
    let timestamp = moment().format('lll');
    const { title, price, user_id ,thumbnail, code, stock, description } = body;
    const item = {
        user_id,
        title,
        price,
        stock,
        code,
        thumbnail,
        timestamp,
        description
    }
    try {
        await knex('cart').insert(item);
        return 'product added successfully';
    } catch (err) {
        loggerConsole.err(err);
        loggerErr.err(err);
        return;
    }
}

async function deleteProduct(id, userId) {
    try{
        await knex('cart').where({id: id, user_id: userId}).del();
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
    deleteProduct
}

