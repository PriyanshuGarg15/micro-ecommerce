const _ = require("lodash");
const moment = require("moment");
module.exports = function (req, res, next) {
  const status = {};
  status["102"] = "Fail"
  status["200"] = "Success";
  status["201"] = "Failed";
  status["202"] = "Invalid Password";
  status["203"] = "Used & Expired Password";
  status["204"] = "No Content";
  status["205"] = "Bad Input";
  status["206"] = "DB Error";
  status["207"] = "Internal Server Error";
  status["208"] = "No valid Password in system";
  status["209"] = "Unused & Expired";
  status["210"] = "Blocked link data";
  status["211"] = "General Error";
  status["400"] = "Bad Request";
  status["401"] = "UnAuthorised";
  status["402"] = "Payment Required";
  status["403"] = "Forbidden";
  status["404"] = "No content";
  status["405"] = "Method Not Allowed";
  status["406"] = "Not Acceptable";
  status["407"] = "Proxy Authentication Required";
  status["408"] = "Request Timeout";
  status["409"] = "Conflict";
  status["410"] = "Gone";
  status["411"] = "Length Required";
  status["412"] = "Precondition Failed";
  status["413"] = "Request Entity Too Large";
  status["414"] = "Request-URI Too Long";
  status["415"] = "Unsupported Media Type";
  status["416"] = "Requested Range Not Satisfiable";
  status["417"] = "Expectation Failed";
  status["500"] = "Internal Server Error";
  status["501"] = "Not Implemented";
  status["502"] = "Bad Gateway";
  status["503"] = "Service Unavailable";
  status["504"] = "Gateway Timeout";
  status["505"] = "HTTP Version Not Supported";
  status["509"] = "Bandwidth Limit Exceeded";
  status["429"] = "Too Many Requests";
  status["421"] = "Misdirected Request";
  status["422"] = "Unprocessable Entity(WebDAV)";
  status["423"] = "Locked";

  

  res.badRequest = (data=null,status_code=400,error_code=null,message=null) => {
    const response={
      status: false,
      status_code:(status_code) ? status_code :"",
      message:(message) ? message:status[status_code],
      data:false,
      error:(data !="") ? data :"Bad Request",
      error_code
    }
    if(!response.status_code){
      delete response.status_code
    }
    res.status(400).json(response);
  };

  // used for anAuthorize Access
  // message should be string
  res.unAuthorized = (message) => {
    res.status(401).json({
      status: false,
      status_code: 401,
      message: status[401],
      data: false,
      error: message,
    });
  };

  res.timeOut = () => {
    res.status(504).json({
      status: false,
      status_code: 504,
      message: status[504],
      data: false,
      error: status[504],
    });
  };

  res.serverError = () => {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: status[500],
      data: false,
      error: status[500],
    });
  };

  res.notFound = (data) => {
    // Set status code
    res.status(404).json({
      status: false,
      status_code: 404,
      message: status[404],
      data: false,
      error: data,
    });
  };
  res.ok = (data) => {
    let callEncPromise ;
    if(req.isSingleEncrypted){
      callEncPromise = encryptData(JSON.stringify(data))
    }else{
      callEncPromise = getEncryptedBody(data)
    }
    callEncPromise
    .then(encText=>{
    res.status(200).json({
      status: true,
      status_code: 200,
      message: status[200],
      data:encText,
      error: false,
    });
  })
  };

  res.noContent = (data) => {
    // Set status code
    res.status(201).json({
      status: false,
      status_code: 201,
      message: data.message,
      data: false,
      error: data,
    });
  };
  next();
};
