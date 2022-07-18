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
    const password = await bcrypt.hash(req.body.password, 10);
    user = { name: req.body.name, email: req.body.email, password };
    req.body = {
      email: user.email,
      password: req.body.password,
    };
    const userExists = await getUser("email", user.email);
    if (userExists) return res.status(400).send(`User already exists`);
    await User.create(user);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const singIn = async (req, res, next) => {
  let user;
  try {
    user = await getUser("email", req.body.email);
    if (!user) return res.status(404).send(`User not found`);
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(400).send(`Password incorrect`);
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
  if (!cookies.jwt) return res.status(401).send(`Unauthorized`);
  const refreshToken = cookies.jwt;
  try {
    const user = await getUser("refreshToken", refreshToken);
    if (!user) return res.status(401).send(`Forbiden`);
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === "string") res.send({ accesToken: newToken });
    else res.status(newToken.status).send(newToken.message);
  } catch (error) {
    next(error);
  }
};

const handleUserSession = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).send(`Unauthorized`);
  const refreshToken = cookies.jwt;
  try {
    const user = await getUser("refreshToken", refreshToken);
    if (!user) return next({ status: 404, message: "Session Inactive" });
    let newToken = verifyRefreshToken(user);
    if (typeof newToken === "string") {
      return res.send({
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
        accessToken: newToken,
      });
    } else res.status(newToken.status).send(newToken.message);
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.status(401).send(`No token found, unauthorized`);
  const refreshToken = cookies.jwt;
  try {
    const user = await getUser("refreshToken", refreshToken);
    if (!user) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }
    await updateRefreshToken(user, true);
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  singUp,
  singIn,
  handleRefreshToken,
  handleUserSession,
  logOut,
};
