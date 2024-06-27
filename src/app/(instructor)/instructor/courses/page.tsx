import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/queries/courses";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


const CoursesPage = async () => {
  const { userId } = auth();
  if(!userId) return redirect('/sign-in');
  const courses = await getCourses(userId);
  return (
    <div className="px-6 py-4">
      <Link href='/instructor/create-course'><Button>Create new course</Button></Link>
      <div className="mt-10 flex flex-col gap-4">
        {
          courses.map(course => (
            <Link href={`/instructor/courses/${course.id}/basic`} key={course.id}>{course.title}</Link>
          ))
        }
      </div>
    </div>
  );
}

export default CoursesPage;
