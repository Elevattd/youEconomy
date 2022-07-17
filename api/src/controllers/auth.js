const { User, Transaction } = require("../db");
const { getUser } = require("../utils/user");
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
    const registredUser = await getUser("email", user.email);
    if (registredUser) res.status(400).send("User already exists");
    await User.create(user);
    res.status(201).send({ msg: "Create successfull" });
  } catch (error) {
    next(error);
  }
};
const singIn = (req, res, next) => {};

module.exports = {
  singUp,
  singIn,
};
