const Pool = require("pg").Pool

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: process.env.POOL_PASSWORD,
    database: "funtime_db",
    port: process.env.SQL_PORT, // PLEASE KEEP IT
});


module.exports = pool


