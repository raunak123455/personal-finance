import { Layout } from "@/components/layout"
import { BudgetForm } from "@/components/budget-form"
import { BudgetComparisonChart } from "@/components/budget-comparison-chart"

export default function BudgetsPage() {
  return (
    <Layout>
      <div className="min-h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Budgets</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
            <BudgetForm />
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
            <BudgetComparisonChart />
          </div>
        </div>
      </div>
    </Layout>
  )
}

