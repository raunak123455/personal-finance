"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, DollarSign, PieChart, BarChart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <aside className="w-64 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:text-white hover:bg-white/20",
                  pathname === "/" && "bg-white/20"
                )}
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:text-white hover:bg-white/20",
                  pathname === "/transactions" && "bg-white/20"
                )}
              >
                <Link href="/transactions">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Transactions
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:text-white hover:bg-white/20",
                  pathname === "/categories" && "bg-white/20"
                )}
              >
                <Link href="/categories">
                  <PieChart className="mr-2 h-4 w-4" />
                  Categories
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:text-white hover:bg-white/20",
                  pathname === "/budgets" && "bg-white/20"
                )}
              >
                <Link href="/budgets">
                  <BarChart className="mr-2 h-4 w-4" />
                  Budgets
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 bg-white bg-opacity-50 backdrop-blur-lg">
        {children}
      </main>
    </div>
  );
}
