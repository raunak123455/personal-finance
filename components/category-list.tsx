"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  transactionService,
  type Transaction,
} from "@/components/transaction-service";

interface CategoryTotal {
  name: string;
  totalSpent: number;
}

export function CategoryList() {
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAndCalculateCategoryTotals();
  }, []);

  const fetchAndCalculateCategoryTotals = async () => {
    try {
      const transactions = await transactionService.getAllTransactions();

      // Calculate totals by category
      const totals = transactions.reduce((acc, transaction) => {
        const category = transaction.category;
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

      // Convert to array and sort by total spent
      const categoryTotalsArray = Object.entries(totals).map(
        ([name, totalSpent]) => ({
          name,
          totalSpent,
        })
      );

      // Sort by total spent (highest first)
      categoryTotalsArray.sort((a, b) => b.totalSpent - a.totalSpent);

      setCategoryTotals(categoryTotalsArray);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Category List</h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/20">
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryTotals.map((category) => (
            <TableRow key={category.name} className="border-b border-white/10">
              <TableCell className="text-white capitalize">
                {category.name}
              </TableCell>
              <TableCell className="text-white">
                ${category.totalSpent.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
