const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { notFound } = require("./middlewares/notFound.js");
const { handleError } = require("./middlewares/handleError.js");
const router = require("./routes");
require("./db.js");
const { CORS_URL } = process.env;
const config = require("../config");

const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: config.cors,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "authorization",
    ],
  })
);

app.get("/", (req, res, next) => {
  res.send(`
  <h1>Welcome to youEconomy API</h1>
  <h3>Endpoints</h3>
  <ul>
    <li> /api </li>
    <li> /api/auth -> GET / POST </li>
    <li> /api/user -> GET </li>
    <li> /api/transaction -> GET / POST / DELETE / PUT</li>
    <br />
    <li> more details in code... :)</li>
  </ul>
`);
});
app.use("/api", router);

app.use(notFound);
app.use(handleError);

module.exports = app;
