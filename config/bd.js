require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  database: PGDATABASE,
  port:PGPORT
});

module.exports = pool
