import { getCourse } from "@/lib/queries/courses";
import { auth } from "@clerk/nextjs/server";
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
  return (
    <div className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>
      </div>
    </div>
  );
}

export default CourseSectionDetailPage;
