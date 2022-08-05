const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { notFound } = require("./middlewares/notFound.js");
const { handleError } = require("./middlewares/handleError.js");
const router = require("./routes");
require("./db.js");
const { CORS_URL } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: CORS_URL,
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

app.use("/api", router);

app.use(notFound);
app.use(handleError);

module.exports = app;
