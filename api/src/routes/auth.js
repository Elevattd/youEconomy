const { Router } = require("express");
const { singUp } = require("../controllers/auth");
const router = Router();

router.post("/singup", singUp);

module.exports = {
  router,
};
