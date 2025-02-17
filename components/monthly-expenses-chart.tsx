"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { transactionService, type Transaction } from "./transaction-service";

interface MonthlyData {
  month: string;
  amount: number;
}

export function MonthlyExpensesChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAndProcessTransactions();
  }, []);

  const fetchAndProcessTransactions = async () => {
    try {
      const transactions = await transactionService.getAllTransactions();

      // Process transactions into monthly totals
      const monthlyTotals = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthYear = date.toLocaleString("default", {
          month: "short",
          year: "2-digit",
        });

        acc[monthYear] = (acc[monthYear] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

      // Convert to array format needed for chart
      const chartData = Object.entries(monthlyTotals).map(
        ([month, amount]) => ({
          month,
          amount,
        })
      );

      // Sort by date
      chartData.sort((a, b) => {
        const dateA = new Date(a.month + " 1, 2024");
        const dateB = new Date(b.month + " 1, 2024");
        return dateA.getTime() - dateB.getTime();
      });

      setMonthlyData(chartData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.2)"
        />
        <XAxis
          dataKey="month"
          stroke="white"
          tickFormatter={(value) => value.split(" ")[0]} // Show only month
        />
        <YAxis stroke="white" tickFormatter={(value) => `$${value}`} />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "none",
            borderRadius: "4px",
            color: "white",
          }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
        />
        <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
