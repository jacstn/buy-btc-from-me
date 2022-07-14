module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASS,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_SERVER,
    "logging": true,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USER_TEST,
    "password": process.env.MYSQL_PASS_TEST,
    "database": process.env.MYSQL_DB_TEST,
    "host": process.env.MYSQL_SERVER_TEST,
    "logging": false,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USER_PROD,
    "password": process.env.MYSQL_PASS_PROD,
    "database": process.env.MYSQL_DB_PROD,
    "host": process.env.MYSQL_SERVER_PROD,
    "logging": true,
    "dialect": "mysql"
  }
}
