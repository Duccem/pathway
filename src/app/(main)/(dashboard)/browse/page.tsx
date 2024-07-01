
import CategoriesList from "@/modules/Course/presentation/components/categories/CategoriesList";
import CourseCard from "@/modules/Course/presentation/components/course/CourseCard";
import { getCategories } from "@/modules/Course/presentation/page-actions/get-categories";
import { getCoursesByCategory } from "@/modules/Course/presentation/page-actions/get-course-by-category";
import { auth } from "@clerk/nextjs/server";


export default async function Browse({ searchParams }: { searchParams: { categoryId: string | null}} ) {
  const { userId } = auth();
  const categories = await getCategories();
  const courses = await getCoursesByCategory(searchParams.categoryId || null, userId);
  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
      <CategoriesList categories={categories} selectedCategory={searchParams.categoryId || null}/>
      <div className="flex flex-wrap gap-7 justify-center">
        {
          courses.map((course) => (
            <CourseCard key={course.id} course={course} studentId={userId}/>
          ))
        }
      </div>
    </div>
  );
}
