require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const pool = new Pool({
 
});

module.exports = pool
