const { User } = require("../db");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateAcessToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
};

const updateRefreshToken = async (user, errase = false) => {
  let token;
  errase
    ? (token = "")
    : (token = jwt.sign(
        {
          UserInfo: {
            name: user.name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      ));
  try {
    await User.update({ refreshToken: token }, { where: { id: user.id } });
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyRefreshToken = (user) => {
  const token = user.refreshToken;
  let newToken;
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error || user.email !== decoded.UserInfo.email)
      newToken = {
        status: 403,
        message: "Token expired",
      };
    else newToken = generateAcessToken(user);
  });
  return newToken;
};

module.exports = {
  generateAcessToken,
  updateRefreshToken,
  verifyRefreshToken,
};
