const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Name can only contain letters.",
        },
        len: {
          args: [6, 255],
          msg: "Name must contain at least 8 characters and 1 special character.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "E-mail must be a valid email",
        },
        notEmpty: {
          args: true,
          msg: "E-mail cannot be incomplete",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.ARRAY,
    },
  });
};
