const mysql = require("mysql2");
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "cgv_schema",
  password: "12345678",
});

module.exports = pool.promise();
