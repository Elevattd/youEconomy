const { User, Transaction } = require("../db");

const getUser = async (prop, value) => {
  const user = await User.findOne({
    where: {
      [prop]: value,
    },
    include: [
      {
        model: Transaction,
        attributes: ["concept", "value", "type"],
      },
    ],
  });
  if (!user) return null;
  return user.dataValues;
};

const getBalance = async (userId) => {
  const transacionsFind = await Transaction.findAll({
    where: { userId: userId },
  });

  let balance = 0;

  transacionsFind.forEach((b) => {
    b.dataValues.type == "entry"
      ? (balance += parseInt(b.dataValues.value))
      : (balance -= parseInt(b.dataValues.value));
  });
  return balance;
};

module.exports = {
  getUser,
  getBalance,
};
