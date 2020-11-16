const mysql = require('mysql');
var util = require('util');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'bovfmvjamitccwuerfzi-mysql.services.clever-cloud.com',
  user            : 'umocb4kxknnnim1y',
  password        : '19auAYJl1TXzQRlT4cuO',
  database        : 'bovfmvjamitccwuerfzi'
});

pool.query = util.promisify(pool.query)


module.exports = pool;