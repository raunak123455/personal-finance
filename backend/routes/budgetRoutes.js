const express = require("express");
const { getBudgets, setBudget } = require("../controllers/budgetController");

const router = express.Router();

router.get("/", getBudgets);
router.post("/", setBudget);

module.exports = router;
