const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    charset: 'utf8mb4',
    host: "localhost",
    user: "username",
    password: "password",
    database: "te19",
});

module.exports = pool;