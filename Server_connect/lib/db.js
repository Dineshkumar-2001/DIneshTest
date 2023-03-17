const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt_learning',
  password: 'password'
});
connection.connect();
module.exports = connection;