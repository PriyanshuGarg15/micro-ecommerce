var Promise = require("bluebird");
var mysql = require("mysql");
var Sequelize = require("sequelize");

Promise.promisifyAll(mysql);
global.Promise = Promise;

var sequelize = new Sequelize(process.env.DB_MASTER_DATABASE,process.env.DB_MASTER_USERNAME, process.env.DB_MASTER_PASSWORD, {
  host: process.env.DB_MASTER_HOST,
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  timezone: "+05:30",
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log(
      process.env.DB_MASTER_DATABASE + " connection has been established successfully."
    );
  })
  .catch((err) => {
    console.error(
      "Unable to connect to the " + process.env.DB_MASTER_DATABASE + " database:",
      err
    );
  });
  global.db = sequelize;
module.exports={
  sequelize
}
