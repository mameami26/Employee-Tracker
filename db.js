const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker',
  password: 'Touba26@',
  port: 5432,
});

module.exports = pool;
 