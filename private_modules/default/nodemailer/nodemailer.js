const nodemailer = require('nodemailer');
require('dotenv').config();

function transporter() {
    const nodemailertransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'obertiagustin6@gmail.com',
          pass: 'agusoberti775'
        }
    });
    return nodemailertransport;
}

function mailOptions(data) {
    const mailoptions = {
        from: 'Servidor Node.js',
        to: 'obertiagustin6@gmail.com',
        subject: 'Register',
        html: '<h1>New user registration</h1><br>'+ JSON.stringify(data),
    }
    return mailoptions;
}

module.exports = {
    transporter,
    mailOptions
}