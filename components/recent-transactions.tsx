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

interface Transaction {
  _id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions/recent"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recent transactions");
      }
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading recent transactions...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-white/20">
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Description</TableHead>
          <TableHead className="text-white">Amount</TableHead>
          <TableHead className="text-white">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction._id} className="border-b border-white/10">
            <TableCell className="text-white">
              {new Date(transaction.date).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-white">
              {transaction.description}
            </TableCell>
            <TableCell className="text-white">
              ${transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell className="text-white capitalize">
              {transaction.category}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
