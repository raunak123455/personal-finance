import type { Metadata } from "next";
import "./globals.css";
import { BudgetProvider } from "@/components/budget-context";

export const metadata: Metadata = {
  title: "Finance visualization app",
  description: "Assignment",
  generator: "Raunak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BudgetProvider>{children}</BudgetProvider>
      </body>
    </html>
  );
}
