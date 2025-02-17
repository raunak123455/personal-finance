import { Layout } from "@/components/layout"
import { CategoryPieChart } from "@/components/category-pie-chart"
import { CategoryList } from "@/components/category-list"

export default function CategoriesPage() {
  return (
    <Layout>
      <div className="min-h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Categories</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
            <CategoryPieChart />
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
            <CategoryList />
          </div>
        </div>
      </div>
    </Layout>
  )
}

