import { getCourse } from "@/modules/Course/presentation/page-actions/get-course";
import CreateSectionCourseForm from "@/modules/CourseSection/presentation/components/CreateSectionCourseForm";
import { getCourseSections } from "@/modules/CourseSection/presentation/page-actions/get-course-sections";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseSectionsPage = async ({ params: { courseId } }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if(!userId) return redirect('/sign-in');
  const course = await getCourse(courseId, userId);
  if(!course) return redirect('/instructor/courses');
  const sections = await getCourseSections(courseId);
  return (
    <CreateSectionCourseForm course={{...course, sections} as any}/>
  );
}

export default CourseSectionsPage;
