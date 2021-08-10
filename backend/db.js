const {Pool} = require("pg").Pool;

const pool = Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "calculator"
})

module.exports = pool;