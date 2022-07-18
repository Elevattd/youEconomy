const { User, Transaction } = require("../db");
const { getUser } = require("../utils/user");
const {
  generateAcessToken,
  updateRefreshToken,
  verifyRefreshToken,
} = require("../utils/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const singUp = async (req, res, next) => {
  let user;
  try {
    const password = await bcrypt.hash(req.body.password, config.rounds);
    user = { name: req.body.name, email: req.body.email, password };
    req.body = {
      email: user.email,
      password: req.body.password,
    };
    const registredUser = await getUser("email", user.email);
    if (registredUser) res.status(400).send("User already exists");
    await User.create(user);
    res.status(201).send({ msg: "Create successfull" });
  } catch (error) {
    next(error);
  }
};
const singIn = async (req, res, next) => {
  let user;
  try {
    user = await await getUser("email", req.body.email);
    if (!user) res.status(404).send("User not exist");
    if (!(await bcrypt.compare(req.body.password, user.password)))
      res.status(400).send("Incorrent Password");
    const accessToken = generateAcessToken(user);
    const refreshToken = await updateRefreshToken(user);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.status(401).send("Unauthorized");
  const refreshToken = cookies.jwt;
  try {
    const user = await getUser("refreshToken", refreshToken);
    if (!user) res.status(403).send("Forbiden");
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === "string") res.send({ accesToken: newToken });
    else res.status(newToken.status).send(newToken.message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  singUp,
  singIn,
  handleRefreshToken,
};
