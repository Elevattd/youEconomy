require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const baerer = req.headers.authorization?.split(" ")[0];
  if (!token || baerer !== "Bearer")
    return res.status(401).send("You need a valid token to access this route");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error)
      return res
        .status(403)
        .send("You don`t have access. Token no longer valid");
    req.body.user = decoded.UserInfo;
    next();
  });
};
