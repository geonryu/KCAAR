require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": "asdf1020!@QW",
    "database": "board-test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "kcaar1020!@",
    "database": "KCAAR",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
