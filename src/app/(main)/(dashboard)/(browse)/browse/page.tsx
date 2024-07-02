
import CourseCard from '@/modules/Course/presentation/components/course/CourseCard';
import { getCoursesByFilters } from '@/modules/Course/presentation/page-actions/get-courses-by-filters';
import { auth } from '@clerk/nextjs/server';

export default async function Browse({
  searchParams,
}: {
  searchParams: { categoryId: string | null; search: string | null };
}) {
  const { userId } = auth();
  const courses = await getCoursesByFilters(
    userId,
    searchParams.categoryId || null,
    searchParams.search || null
  );
  return (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} studentId={userId} />
      ))}
    </>
  );
}
