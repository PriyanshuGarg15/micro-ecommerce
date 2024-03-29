require("dotenv-flow").config();

module.exports = {
  development: {
    host: process.env.DB_MASTER_HOST,
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_MASTER_DATABASE,
    dialect: process.env.DB_MASTER_DIALECT,
  },
  local: {
    host: process.env.DB_MASTER_HOST,
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_MASTER_DATABASE,
    dialect: process.env.DB_MASTER_DIALECT,
  },
  production: {
    host: process.env.DB_MASTER_HOST,
    username: process.env.DB_MASTER_USERNAME,
    password: process.env.DB_MASTER_PASSWORD,
    database: process.env.DB_MASTER_DATABASE,
    dialect: process.env.DB_MASTER_DIALECT,
  },
};
