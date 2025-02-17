import express from "express";
import { getBudgets, setBudget } from "../controllers/budgetController";

const router = express.Router();

router.get("/", getBudgets);
router.post("/", setBudget);

export default router;
