const { User } = require("../db.js");
const { getBalance } = require("../utils/user.js");

const getUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    let user = await User.findByPk(id);
    if (!user) res.status(404).send({ error: "User not found" });
    const balance = await getBalance(id);

    user = {
      ...user.dataValues,
      balance,
    };
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
};
