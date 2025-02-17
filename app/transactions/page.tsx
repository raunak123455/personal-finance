"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { TransactionList } from "@/components/transaction-list";
import { TransactionForm } from "@/components/transaction-form";

interface Transaction {
  _id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionChange = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedTransaction(null);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Layout>
      <div className="min-h-full bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Transactions</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
            <TransactionList key={refreshKey} onEdit={handleEdit} />
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
            <TransactionForm
              onTransactionChange={handleTransactionChange}
              editTransaction={selectedTransaction}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
