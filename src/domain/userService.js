const {options} = require('../infrastructure/services/mariaDB');
const knex = require('knex')(options);
const bcrypt = require('bcrypt');
const accessTokenValidator = require('../../private_modules/validators/accessTokenValidator');
const nodemailer = require('../../private_modules/default/nodemailer/nodemailer');
const { response } = require('express');
const log4js = require('../../private_modules/default/logerHandler/log4js');

const logger = log4js.log();
const loggerConsole = logger.getLogger();
const loggerWarn = logger.getLogger('fileWarn');
const loggerErr = logger.getLogger('fileErr');

async function logIn(params) {    
    const user = await knex('user').select().where({ user_username: params.username });
    if(user.length != 0){
        const passwordIsOk = bcrypt.compareSync(
            params.password,
            user[0].user_password
        );
        if(passwordIsOk) {
            delete user[0].user_password;
            const token = accessTokenValidator.generateToken(user[0]);
            const response = {access_token: token};
            return response;
        }else {
            loggerConsole.warn('Invalid password');
            loggerWarn.warn('Invalid password');
            return {message: 'Invalid password'};
        }
    }else {
        loggerConsole.warn('Invalid user');
        loggerWarn.warn('Invalid user');
        return {message: 'Invalid user'};
    }
}

async function register(params) {
    const hashPassword = bcrypt.hashSync(params.password, 10);
    try {
        const user = {
            user_username: params.username,
            user_password: hashPassword,
            user_first_name: params.personal_details.first_name,
            user_last_name: params.personal_details.last_name,
            user_age: params.personal_details.age,
            user_email: params.personal_details.email,
            user_phone_number: params.personal_details.phone_number,
        };
        const responseDb = await knex('user').insert(user);
        const sendToMail = {
            user: params.username,
            first_name: params.personal_details.first_name,
            last_name: params.personal_details.last_name,
            age: params.personal_details.age,
            email: params.personal_details.email,
            phone_number: params.personal_details.phone_number,
        };
        const responseToSend = {
            user: {
                id_user: responseDb[0]
            },
        };
        const mail = nodemailer.transporter();
        const options = nodemailer.mailOptions(sendToMail);
        mail.sendMail(options);
        return responseToSend;
    } catch (err) {
        loggerConsole.error(err);
        loggerErr.error('Error in register');
        return 'Error in register';
    }
}

module.exports = {
    logIn,
    register
}