const { Router } = require("express");
const {
  singUp,
  singIn,
  handleRefreshToken,
  handleUserSession,
  logOut,
} = require("../controllers/auth");
const router = Router();

router.post("/singup", singUp);
router.post("/singin", singIn);
router.get("/refresh", handleRefreshToken);
router.get("/", handleUserSession);
router.get("/logout", logOut);

module.exports = {
  router,
};
