import { courseSectionProgressCompletedCount } from "@/lib/queries/courses";
import { getPurchase } from "@/lib/queries/purchase";
import { Course, CourseSection } from "@prisma/client";
import Link from "next/link";
import { Progress } from "../ui/progress";

interface CourseSideBarProps {
  course: Course & { sections: CourseSection[] };
  studentId: string;
}
const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
  const publishedSections = course.sections.filter((section) => section.isPublished);
  const publishedSectionsIds = publishedSections.map((section) => section.id);
  const purchase = await getPurchase(studentId, course.id);
  const completedSections = await courseSectionProgressCompletedCount(studentId, publishedSectionsIds);
  const progressPercentage = Math.round((completedSections / publishedSections.length) * 100);
  return (
    <div className="max-sm:hidden flex flex-col w-64 px-3 py-3 my-4 gap-4 text-sm font-medium h-full">
      <h1 className="text-lg font-bold text-center mb-4">
        {course.title}
      </h1>
      {
        purchase && (
          <div className="mx-3">
            <Progress value={progressPercentage} className="h-2 "/>
            <p className="text-xs mt-2">%{progressPercentage} <span className="font-bold">completed</span></p>
          </div>
        )
      }
      <Link href={`/courses/${course.id}/overview`} className="p-3 rounded-lg hover:bg-[#dfcbfa] mt-4">Overview</Link>
      {
        publishedSections.map((section) => (
          <Link href={`/courses/${course.id}/section/${section.id}`} key={section.id} className="p-3 rounded-lg hover:bg-[#dfcbfa]">
            {section.title}
          </Link>
        ))
      }
    </div>
  );
}

export default CourseSideBar;
