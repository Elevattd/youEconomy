const express = require("express");
const fs = require("fs");
const router = express.Router();

const pathRouter = `${__dirname}`;
const removeExtension = (fileName) => fileName.split(".").shift();

fs.readdirSync(pathRouter).filter(async (file) => {
  const fileWWithOutExt = removeExtension(file);
  let skip;
  fileWWithOutExt
    ? (skip = ["index"].includes(fileWWithOutExt))
    : (skip = false);
  if (!skip) {
    import(`./${fileWWithOutExt}.js`).then((module) =>
      router.use(`/${fileWWithOutExt}`, module.router)
    );
    console.log("LOAD ROUTE --->", fileWWithOutExt);
  }
});

module.exports = router;
