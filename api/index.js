const app = require("./src/app.js");
const { sequelize } = require("./src/db");
const config = require("./config.js");

sequelize.sync({ force: true }).then(() => {
  app.listen(config.port, () => {
    console.log(`LOAD SERVER --> ON: ${config.port}`);
  });
});
