require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../db");

// const authMiddleware1 = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   const baerer = req.headers.authorization?.split(" ")[0];
//   if (!token || baerer !== "Bearer")
//     return res.status(401).send("You need a valid token to access this route");
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
//     if (error)
//       return res
//         .status(403)
//         .send("You don`t have access. Token no longer valid");
//     req.body.user = decoded.UserInfo;
//     next();
//   });
// };

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const bearer = req.headers.authorization?.split(" ")[0];

    if (!token || bearer !== "Bearer")
      return res.status(403).send({ msg: "No token provided" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.UserInfo.id;
    const isUserExist = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!isUserExist) {
      return res.status(404).send({ msg: "No user finded, invalid token" });
    }

    next();
  } catch (error) {
    return res.status(404).send({ error });
  }
};

module.exports = {
  authMiddleware,
};
