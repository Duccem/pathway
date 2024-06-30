import ChartRevenue from "@/modules/CoursePurchase/presentation/components/ChartRevenue"
import ChartStudents from "@/modules/CoursePurchase/presentation/components/ChartStudents"
import DataCard from "@/modules/CoursePurchase/presentation/components/DataCard"
import { getPerformance } from "@/modules/CoursePurchase/presentation/page-actions/get-performance"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const InstructorPerformancePage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const { data, totalRevenue, totalSales } = await getPerformance(userId)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalRevenue} label="Total Revenue" shouldFormat />
        <DataCard value={totalSales} label="Total Sales" />
        <ChartRevenue data={data} />
        <ChartStudents data={data}/>
      </div>
    </div>
  )
}

export default InstructorPerformancePage;
