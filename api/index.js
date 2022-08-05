const app = require("./src/app.js");
const { sequelize } = require("./src/db");
const { PORT } = process.env;

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`LOAD SERVER --> ON: ${PORT}`);
  });
});
