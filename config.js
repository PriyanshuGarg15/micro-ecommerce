require("dotenv-flow").config();
var path = require("path");
var config = {};

config.clients = {};
config.clients.secret = "ec0mPr1yans4u";

config.message = {};
config.message.portMsg = "listening on *:";

config.requests = [
  {
    path: "*",
    timeout: 3000000000000000000,
  },
];


config.corsAllowedOrigin = [
  /localhost:4040$/,
];

config.host = process.env.HOST;
config.hostName = process.env.HOST_NAME;
config.port = process.env.PORT;

config.timeout = 900000;

config.databases = {};
config.databases.db = {};

config.databases.db.host = process.env.DB_MASTER_HOST;
config.databases.db.user = process.env.DB_MASTER_USERNAME;
config.databases.db.password = process.env.DB_MASTER_PASSWORD;
config.databases.db.database = process.env.DB_MASTER_DATABASE;
// config.databases.db.dialect = process.env.DB_MASTER_DIALECT;

config.API_PREFIX = "gac_";

config.redisDB = {};
config.redisDB.url = process.env.REDIS_URI;

global.BASE_DIR = path.join(__dirname, "./");
global.CONFIG_PATH = BASE_DIR + "/";
global.DB_PATH = BASE_DIR + "db/";
global.BASE_APP_DIR = BASE_DIR + "app/";
global.ROUTER_PATH = BASE_DIR + "routes/";
module.exports = config;
