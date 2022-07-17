const dotenv = require("dotenv");

dotenv.config();

const config = {
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || 7508,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_NAME: process.env.DB_NAME || "you_economy",
  DB_PORT: process.env.DB_PORT || 5432,
  port: process.env.API_PORT || 3001,
  host: process.env.API_HOST || "localhost",
  cors: process.env.CORS || "http://localhost:3000",
  production: process.env.NODE_ENV == "production",

  //
  secret:
    process.env.AUTH_SECRET ||
    "eyJ1c2VyIjp7ImlkIjo0MSwibmFtZSI6Ik1hcmlhbm8iLCJlbWFpjItMDctMDZUMDg6MTM",
  expires: process.env.AUTH_EXPIRES || "24h",
  rounds: process.env.AUTH_ROUNDS || 10,
};

module.exports = config;
