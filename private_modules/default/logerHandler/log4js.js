const { func } = require('joi');
const log4js = require('log4js');

function log() {
    const loger = log4js.configure({
        appenders: {
            console: {type: 'console'},
            fileWarn: {type: 'file', filename: './src/logger/warn.log'},
            fileErr: {type: 'file', filename: './src/logger/err.log'}
        },
        categories: {
            default: {appenders: ['console'], level: 'trace'},
            fileWarn: {appenders: ['fileWarn'], level:'warn'},
            fileErr: {appenders: ['fileErr'], level: 'error'}
        }
    })
    return loger;
};

module.exports = {
    log
}