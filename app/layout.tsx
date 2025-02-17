import type { Metadata } from "next";
import "./globals.css";
import { BudgetProvider } from "@/components/budget-context";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
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
