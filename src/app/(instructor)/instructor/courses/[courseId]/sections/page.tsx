import CreateSectionCourseForm from "@/components/course/CreateSectionCourseForm";
import { getCourse } from "@/lib/queries/courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseSectionsPage = async ({ params: { courseId } }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if(!userId) return redirect('/sign-in');
  const course = await getCourse(courseId, userId);
  if(!course) return redirect('/instructor/courses');
  return (
    <CreateSectionCourseForm course={course as any}/>
  );
}

export default CourseSectionsPage;
