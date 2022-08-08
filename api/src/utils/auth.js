const { User } = require("../db");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        name: user.name,
        email: user.email,
        id: user.id,
        balance: user.balance,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
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
            balance: user.balance,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      ));
  try {
    await User.update(
      { refreshToken: token },
      { where: { email: user.email } }
    );
    console.log("token", token);
    return token;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const verifyRefreshToken = (user) => {
  const token = user.refreshToken;
  let newToken;
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    let decodedUserInfo = decoded;
    if (error || user.email !== decodedUserInfo.UserInfo.email)
      newToken = {
        status: 403,
        message: "Token expired",
      };
    else newToken = generateAccessToken(user);
  });
  return newToken;
};

module.exports = {
  generateAccessToken,
  updateRefreshToken,
  verifyRefreshToken,
};
