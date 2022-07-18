const { Router } = require("express");

const { getUser } = require("../controllers/user.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const router = Router();

router.get("/:id", authMiddleware, getUser);

module.exports = {
  router,
};
