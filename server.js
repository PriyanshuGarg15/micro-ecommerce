const express = require("express");
const app = express(); 
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const YAML= require('yamljs')
const swaggerDocument = YAML.load('swagger.yaml');


require("dotenv-flow").config();
const config = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const response = require("./app/middlewares/response");

app.use(helmet());
app.use(response);
global.app = app;
global.config = config;
require(`${DB_PATH}dbConnection`);
process.on("uncaughtException", function (exception) {
  console.log("########## SERVER CRASHED WITH UNCAUGHT EXCEPTION ##########");
  var err = exception;
  if (typeof err === "object") {
    if (err.message) {
      console.log("\nMessage: " + err.message);
    }
    if (err.stack) {
      console.log("\nStacktrace:");
      console.log("====================");
      console.log(err.stack);
    }
  } else {
    console.log("dumpError :: argument is not an object");
  }
});

app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
); // support encoded bodies
app.use(
  cors({
    origin: config.corsAllowedOrigin,
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  })
);
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "FsMflashSession",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(__dirname + "/public"));
require(`${ROUTER_PATH}index`);

//public pages
(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') && app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "/app/views");
app.set("view engine", "html");

app.use(function (req, res, next) {
  const timeout = config.timeout;
  if (timeout) {
    res.setTimeout(timeout, function () {
      console.log("Timeout");
      res.timeOut();
    });
  }
  next();
});

// 404
app.use(function (req, res, next) {
  return res.badRequest("Route" + req.url + " Not found.");
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  return res.serverError();
});

module.exports = app;
