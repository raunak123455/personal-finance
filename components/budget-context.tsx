"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { transactionService, type Budget } from "./transaction-service";

interface BudgetContextType {
  budgets: Budget[];
  setBudget: (category: string, amount: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await transactionService.getAllBudgets();
      setBudgets(data);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch budgets");
      setIsLoading(false);
    }
  };

  const setBudget = async (category: string, amount: number) => {
    try {
      const updatedBudget = await transactionService.setBudget(
        category,
        amount
      );
      setBudgets((prev) => {
        const existing = prev.findIndex((b) => b.category === category);
        if (existing >= 0) {
          const newBudgets = [...prev];
          newBudgets[existing] = updatedBudget;
          return newBudgets;
        }
        return [...prev, updatedBudget];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set budget");
      throw err; // Propagate error to form
    }
  };

  return (
    <BudgetContext.Provider value={{ budgets, setBudget, isLoading, error }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
