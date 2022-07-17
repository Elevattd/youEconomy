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

module.exports = {
  getUser,
};
