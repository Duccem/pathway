import EditCourseSectionForm from "@/components/course/EditCourseSectionForm";
import { getCourse, getCourseSection } from "@/lib/queries/courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CourseSectionDetailPageProps {
  params: {
    courseId: string;
    sectionId: string;
  }
}
const CourseSectionDetailPage = async ({ params: { courseId, sectionId }  }: CourseSectionDetailPageProps) => {
  const { userId } = auth();

  if(!userId) {
    return redirect('/sign-in');
  }

  const course = await getCourse(courseId, userId);

  if(!course) {
    return redirect('/instructor/courses');
  }

  const section = await getCourseSection(sectionId, courseId);
  if(!section) {
    return redirect(`/instructor/courses/${courseId}/sections`);
  }
  return (
    <EditCourseSectionForm courseId={courseId} section={section} isComplete={false}/>
  );
}

export default CourseSectionDetailPage;
