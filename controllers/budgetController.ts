import { Request, Response } from "express";
import Budget from "../models/Budget";

// Get all budgets
export const getBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budgets" });
  }
};

// Set budget for a category
export const setBudget = async (req: Request, res: Response) => {
  try {
    const { category, amount } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { category },
      { amount },
      { new: true, upsert: true }
    );

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error setting budget" });
  }
};
