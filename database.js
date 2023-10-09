const Pool = require('pg').Pool
const pool = new Pool({
    user:'mac',
    host: 'localhost',
    database: 'movie_database',
    password: 'no-password',
    port: 5432,
})


module.exports = pool;