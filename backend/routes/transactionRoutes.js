const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getRecentTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.get("/", getTransactions);
router.get("/recent", getRecentTransactions);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
