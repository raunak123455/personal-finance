const Budget = require("../models/Budget");

// Get all budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    console.error("Error in getBudgets:", error);
    res.status(500).json({ message: "Error fetching budgets" });
  }
};

// Set budget for a category
exports.setBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { category },
      { amount },
      { new: true, upsert: true }
    );

    res.json(budget);
  } catch (error) {
    console.error("Error in setBudget:", error);
    res.status(500).json({ message: "Error setting budget" });
  }
};
