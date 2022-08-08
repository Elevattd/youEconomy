require("dotenv").config();
const jwt = require("jsonwebtoken");

// authenticate the token send by header on the request

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const bearer = req.headers.authorization?.split(" ")[0];
  if (!token | (bearer !== "Bearer"))
    return res.status(401).send(`No token found, unauthorized`);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send(`No token found, unauthorized`);
    req.body.user = decoded.UserInfo;
    next();
  });
};

module.exports = {
  authenticateToken,
};
