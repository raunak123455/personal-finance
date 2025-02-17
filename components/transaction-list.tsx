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
import { Button } from "@/components/ui/button";
import {
  transactionService,
  type Transaction,
} from "@/components/transaction-service";

interface TransactionListProps {
  onEdit: (transaction: Transaction) => void;
}

export function TransactionList({ onEdit }: TransactionListProps) {
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

  const handleDelete = async (id: string) => {
    try {
      await transactionService.deleteTransaction(id);
      fetchTransactions();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete transaction"
      );
    }
  };

  if (loading) {
    return <div className="text-white">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Transaction List</h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/20">
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction._id}
              className="border-b border-white/10"
            >
              <TableCell className="text-white">
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {transaction.description}
              </TableCell>
              <TableCell className="text-white">
                ${transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-white">
                {transaction.category}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-[80px] mr-2 bg-white/20 text-white hover:bg-white/30"
                  onClick={() => onEdit(transaction)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-[80px] bg-red-500/50 hover:bg-red-500/70"
                  onClick={() => handleDelete(transaction._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
