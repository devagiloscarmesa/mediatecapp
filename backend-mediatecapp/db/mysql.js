const mysql = require('mysql');
var util = require('util');
require('dotenv').config()
	
const pool  = mysql.createPool({
  connectionLimit : 10,
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE
});
 
pool.query = util.promisify(pool.query)

module.exports = pool;