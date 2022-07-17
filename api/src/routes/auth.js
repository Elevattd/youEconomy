const { Router } = require("express");
const { singUp, singIn } = require("../controllers/auth");
const router = Router();

router.post("/singup", singUp);
router.post("/singin", singIn);

module.exports = {
  router,
};
