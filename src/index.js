const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./application/routes/index');
const log4js = require('../private_modules/default/logerHandler/log4js');
const PORT = 3000 || process.env.PORT; 

const logger = log4js.log();
const loggerConsole = logger.getLogger();

app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, function() {
    loggerConsole.info(`Server running on: http://localhost:${PORT}`);
})