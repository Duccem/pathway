import { getCourse } from "@/modules/Course/presentation/page-actions/get-course";
import EditCourseSectionForm from "@/modules/CourseSection/presentation/components/EditCourseSectionForm";
import { getCourseSection } from "@/modules/CourseSection/presentation/page-actions/get-course-section";
import IncompleteBanner from "@/modules/shared/presentation/components/IncompleteBanner";
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
  const requiredFields = [section.title, section.description, section.videoUrl];
  const isComplete = requiredFields.every(Boolean);
  const requiredFieldsCount = requiredFields.length;
  const missingFieldsCount = requiredFields.filter(field => !Boolean(field)).length;
  return (
    <div className="px-10">
      { !section.isPublished ? <IncompleteBanner isCompleted={isComplete} requiredFieldsCount={requiredFieldsCount} missingFieldsCount={missingFieldsCount}/> : null }
      <EditCourseSectionForm courseId={courseId} section={section} isComplete={isComplete}/>
    </div>
  );
}

export default CourseSectionDetailPage;
