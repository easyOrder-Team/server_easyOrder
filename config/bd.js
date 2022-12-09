require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
// const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

module.exports = pool;
