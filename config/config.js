require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "KCAAR",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: process.env.SEQUELIZE_PASSWORD,
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "KCAAR",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};