require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

const pool = new Pool({
  // user: PGUSER,
  // host: PGHOST,
  // password: PGPASSWORD,
  // database: PGDATABASE,
  // port:PGPORT
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

module.exports = pool
