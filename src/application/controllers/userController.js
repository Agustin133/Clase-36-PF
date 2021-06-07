const userService = require('../../domain/userService');
const  Joi  = require('joi');
const joiValid = require('../../../private_modules/validators/joiValidator')
const bcrypt = require('bcrypt');

async function logIn(req, res) {
    const data = {
        username: req.body.user.username,
        password: req.body.user.password
    };
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required().min(8).max(20)
    });
    joiValid(schema, data);
    const response = await userService.logIn(data);
    res.json(response);
}

async function register(req, res) {
    const data = {
        username: req.body.user.username,
        password: req.body.user.password,
        personal_details: {
            first_name: req.body.user.personal_details.first_name,
            last_name: req.body.user.personal_details.last_name,
            email: req.body.user.personal_details.email,
            age: req.body.user.personal_details.age,
            phone_number: req.body.user.personal_details.phone_number
        },
    };
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required().min(8).max(20),
        personal_details: Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            age: Joi.string().required(),
            email: Joi.string().required(),
            phone_number: Joi.string().required(),
        }),
    });
    joiValid(schema, data, true);
    const response = await userService.register(data);
    res.json(response);
}

//========================================================================================

async function password(req, res) {
    const hashPassword = bcrypt.hashSync(req.params.password, 10);
    res.json(hashPassword);
}
//========================================================================================

module.exports = {
    logIn,
    register,
    password
}