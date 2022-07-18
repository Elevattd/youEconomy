const { Router } = require("express");

//Controllers
const {
  getTransactions,
  createTransaction,
  getTransactionsById,
  getCurrentTransaction,
  getHistory,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transacions");
const router = Router();

/*Protected */
router.get("/", getTransactions);

/* Public */
router.post("/post/:userId", createTransaction);
router.get("/:id", getTransactionsById);
router.get("/current/:userId", getCurrentTransaction);
router.get("/history/:userId", getHistory);
router.delete("/delete/:userId", deleteTransaction);
router.put("/update/:id", updateTransaction);

module.exports = { router };
