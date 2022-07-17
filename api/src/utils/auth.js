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

module.exports = {
  generateAcessToken,
  updateRefreshToken,
};
