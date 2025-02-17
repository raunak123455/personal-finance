"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { transactionService } from "@/components/transaction-service";
import { useBudget } from "./budget-context";

interface ChartData {
  category: string;
  budget: number;
  actual: number;
}

export function BudgetComparisonChart() {
  const { budgets, isLoading: isBudgetsLoading } = useBudget();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isBudgetsLoading) {
      fetchAndProcessData();
    }
  }, [budgets, isBudgetsLoading]);

  const fetchAndProcessData = async () => {
    try {
      const transactions = await transactionService.getAllTransactions();

      // Calculate actual spending by category
      const actualSpending = transactions.reduce((acc, transaction) => {
        const category = transaction.category;
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

      // Create a map of budgets by category
      const budgetMap = budgets.reduce((acc, budget) => {
        acc[budget.category] = budget.amount;
        return acc;
      }, {} as Record<string, number>);

      // Combine all unique categories
      const allCategories = [
        ...new Set([...Object.keys(budgetMap), ...Object.keys(actualSpending)]),
      ];

      // Create combined data
      const combinedData = allCategories.map((category) => ({
        category,
        budget: budgetMap[category] || 0,
        actual: actualSpending[category] || 0,
      }));

      setChartData(combinedData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (loading || isBudgetsLoading) {
    return <div className="text-white">Loading budget comparison...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-white">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis
            dataKey="category"
            stroke="white"
            tickFormatter={(value) =>
              value.charAt(0).toUpperCase() + value.slice(1)
            }
          />
          <YAxis stroke="white" tickFormatter={(value) => `$${value}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#333",
            }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Legend wrapperStyle={{ color: "white" }} />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
