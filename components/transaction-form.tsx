"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionFormProps {
  onTransactionChange?: () => void;
  editTransaction?: {
    _id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
  } | null;
}

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});

export function TransactionForm({
  onTransactionChange,
  editTransaction,
}: TransactionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      description: "",
      amount: "",
      category: "",
    },
  });

  // Set form values when editing a transaction
  useEffect(() => {
    if (editTransaction) {
      setIsEditing(true);
      form.reset({
        date: new Date(editTransaction.date).toISOString().split("T")[0],
        description: editTransaction.description,
        amount: editTransaction.amount.toString(),
        category: editTransaction.category,
      });
    }
  }, [editTransaction, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url =
        isEditing && editTransaction
          ? `http://localhost:5000/api/transactions/${editTransaction._id}`
          : "http://localhost:5000/api/transactions";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: values.date,
          description: values.description,
          amount: parseFloat(values.amount),
          category: values.category,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditing ? "update" : "create"} transaction`
        );
      }

      // Reset form and state
      setIsEditing(false);
      form.reset({
        date: "",
        description: "",
        amount: "",
        category: "",
      });

      // Notify parent component to refresh the list
      if (onTransactionChange) {
        onTransactionChange();
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error:", err);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">
        {isEditing ? "Edit Transaction" : "Add Transaction"}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="bg-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white/10 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    className="bg-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/10 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {isEditing ? "Update" : "Add"} Transaction
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
