const { Router } = require("express");
const { singUp, singIn, handleRefreshToken } = require("../controllers/auth");
const router = Router();

router.post("/singup", singUp);
router.post("/singin", singIn);
router.get("/refresh-token", handleRefreshToken);

module.exports = {
  router,
};
