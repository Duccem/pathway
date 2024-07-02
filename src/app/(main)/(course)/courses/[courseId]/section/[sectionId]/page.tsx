import { getCourse } from "@/modules/Course/presentation/page-actions/get-course";
import { getPurchase } from "@/modules/CoursePurchase/presentation/page-actions/get-purchase";
import CourseSectionDetail from "@/modules/CourseSection/presentation/components/CourseSectionDetail";
import { getCourseSection } from "@/modules/CourseSection/presentation/page-actions/get-course-section";
import { getCourseSections } from "@/modules/CourseSection/presentation/page-actions/get-course-sections";
import { getSectionResources } from "@/modules/CourseSection/presentation/page-actions/get-section-resources";
import { getUserProgress } from "@/modules/CourseSectionProgress/presentation/get-user-progress";
import { auth } from "@clerk/nextjs/server";
import { CourseSectionResource } from "@prisma/client";
import { redirect } from "next/navigation";

interface CourseSectionDetailPageProps {
  courseId: string;
  sectionId: string;
}
const CourseSectionDetailPage = async ({ params }: { params: CourseSectionDetailPageProps }) => {
  const { courseId, sectionId } = params;
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  const course = await getCourse(courseId, userId);
  if (!course) {
    return redirect('/');
  }
  const section = await getCourseSection(sectionId, courseId);
  const sections = await getCourseSections(courseId);
  if (!section) {
    return redirect(`/courses/${courseId}/overview`);
  }
  let muxData = null;
  let resources: CourseSectionResource[] = [];
  const purchase = await getPurchase(userId, courseId);
  if(purchase) {
    resources = await getSectionResources(sectionId);
  }
  const progress = await getUserProgress(userId, sectionId);
  return (
    <CourseSectionDetail 
      course={{...course, sections}} 
      purchase={purchase} 
      section={section} 
      resources={resources} 
      muxData={muxData}
      progress={progress}
    />
  );
}

export default CourseSectionDetailPage;
