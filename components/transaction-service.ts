interface Transaction {
  _id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface Budget {
  _id: string;
  category: string;
  amount: number;
}

const BASE_URL = "http://localhost:5000/api";

export const transactionService = {
  // Get all transactions
  async getAllTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${BASE_URL}/transactions`);
      if (!response.ok) throw new Error("Failed to fetch transactions");
      return response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  // Get recent transactions
  async getRecentTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${BASE_URL}/transactions/recent`);
      if (!response.ok) throw new Error("Failed to fetch recent transactions");
      return response.json();
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  },

  // Create a new transaction
  async createTransaction(
    transaction: Omit<Transaction, "_id">
  ): Promise<Transaction> {
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) throw new Error("Failed to create transaction");
      return response.json();
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  // Update a transaction
  async updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction> {
    try {
      const response = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) throw new Error("Failed to update transaction");
      return response.json();
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  },

  // Delete a transaction
  async deleteTransaction(id: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  },

  // New budget methods
  async getAllBudgets(): Promise<Budget[]> {
    try {
      const response = await fetch(`${BASE_URL}/budgets`);
      if (!response.ok) throw new Error("Failed to fetch budgets");
      return response.json();
    } catch (error) {
      console.error("Error fetching budgets:", error);
      throw error;
    }
  },

  async setBudget(category: string, amount: number): Promise<Budget> {
    try {
      const response = await fetch(`${BASE_URL}/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, amount }),
      });
      if (!response.ok) throw new Error("Failed to set budget");
      return response.json();
    } catch (error) {
      console.error("Error setting budget:", error);
      throw error;
    }
  },
};

// Export the Transaction and Budget types for use in other components
export type { Transaction, Budget };
