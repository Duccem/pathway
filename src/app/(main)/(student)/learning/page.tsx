import CourseCard from "@/components/course/CourseCard"
import { getPurchasedCourses } from "@/lib/queries/purchase"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const LearningPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const purchasedCourses = await getPurchasedCourses(userId)

  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
      <h1 className="text-2xl font-bold">
        Your courses
      </h1>
      <div className="flex flex-wrap gap-7 mt-7 max-sm:justify-center">
        {purchasedCourses.map((purchase) => (
          <CourseCard key={purchase.course.id} course={purchase.course} />
        ))}
      </div>
    </div>
  )
}

export default LearningPage