const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    concept: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        let dateClear = this.getDataValue("date");
        dateClear = typeof dateClear === "string" && dateClear?.split("-");
        return dateClear
          ? `${dateClear[2]}/${dateClear[1]}/${dateClear[0]}`
          : null;
      },
    },
  });
};
