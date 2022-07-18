const jwt_config = require("../config/jwt-token");
const JWT = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    JWT.verify(token, jwt_config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 0,
          message: "Not authorized",
          data: err,
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      status: 0,
      message: "Not authorized",
    });
  }
};

module.exports = {
  checkToken,
};
