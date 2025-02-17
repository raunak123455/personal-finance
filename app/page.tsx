"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyExpensesChart } from "@/components/monthly-expenses-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import {
  transactionService,
  type Transaction,
} from "@/components/transaction-service";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionService.getAllTransactions();
      setTransactions(response);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Calculate this month's expenses
  const thisMonth = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const now = new Date();
    return (
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear()
    );
  });
  const thisMonthTotal = thisMonth.reduce((sum, t) => sum + t.amount, 0);

  // Calculate top category
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0] || ["None", 0];

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white">Loading dashboard...</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle>Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  ${totalExpenses.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle>Top Category</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold capitalize">
                  {topCategory[0]}
                </p>
                <p className="text-sm text-gray-200">
                  ${topCategory[1].toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none text-white">
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  ${thisMonthTotal.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none">
              <CardHeader>
                <CardTitle className="text-white">Monthly Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyExpensesChart />
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none">
              <CardHeader>
                <CardTitle className="text-white">
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="min-h-full bg-gradient-to-r from-cyan-500 to-blue-500 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none text-white">
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none text-white">
            <CardHeader>
              <CardTitle>Top Category</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold capitalize">{topCategory[0]}</p>
              <p className="text-sm text-gray-200">
                ${topCategory[1].toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none text-white">
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${thisMonthTotal.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none">
            <CardHeader>
              <CardTitle className="text-white">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyExpensesChart />
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card className="bg-white bg-opacity-20 backdrop-blur-lg border-none">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
