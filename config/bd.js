require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = pool
