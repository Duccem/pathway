import CourseSectionDetail from "@/components/course/CourseSectionDetail";
import { getCourse, getSectionMuxData, getSectionResources, getUserSectionProgress } from "@/lib/queries/courses";
import { getPurchase } from "@/lib/queries/purchase";
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
  const section = course.sections.find((section) => section.id === sectionId);
  if (!section) {
    return redirect(`/courses/${courseId}/overview`);
  }
  let muxData = null;
  let resources: CourseSectionResource[] = [];
  const purchase = await getPurchase(userId, courseId);
  if(purchase) {
    resources = await getSectionResources(sectionId);
  }
  if (section.isFree || purchase) {
    muxData = await getSectionMuxData(sectionId);
  }
  const progress = await getUserSectionProgress(userId, sectionId);
  return (
    <CourseSectionDetail 
      course={course} 
      purchase={purchase} 
      section={section} 
      resources={resources} 
      muxData={muxData}
      progress={progress}
    />
  );
}

export default CourseSectionDetailPage;
