// const authMiddleware = require(`${BASE_APP_DIR}clients/middlewares/authMiddleware`);
const _=require("lodash");
const client = require(`./clientsRoute`);


app.use(async function (req, res, next) {
  try {
   let str = req.path;
   let path = str.split("/")[1];
   const privateRoutes = ["account"]; //protected Pages
   if (privateRoutes.includes(path)) {
    //  return await authMiddleware.validateToken(req, res, next);
   } else {
     next();
   }
  } catch (error) {
    res.badRequest(error.message);
  }
 });

app.use('/clients/', client);
app.use('/products', )
