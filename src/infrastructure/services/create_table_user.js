const {options} = require('./mariaDB');
const knex = require('knex')(options);

knex.schema.createTable('user',table => {
    table.increments('id')
    table.string('user_username')
    table.string('user_password')
    table.string('user_email')
    table.string('user_first_name')
    table.string('user_last_name')
    table.string('user_age')
    table.integer('user_phone_number')
})
    .then(()=> console.log('table created'))
    .catch((err) => console.log(err))
    .finally(() => {
        knex.destroy();
    });