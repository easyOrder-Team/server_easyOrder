require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
// const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DB_DEPLOY } =
  process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  //deploy: DB_DEPLOY,
});

module.exports = pool;
