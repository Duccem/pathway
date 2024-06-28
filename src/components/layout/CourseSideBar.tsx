import { Course, CourseSection } from "@prisma/client";
import Link from "next/link";

interface CourseSideBarProps {
  course: Course & { sections: CourseSection[] };
  studentId: string;
}
const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
  const publishedSections = course.sections.filter((section) => section.isPublished);
  return (
    <div className="max-sm:hidden flex flex-col w-64 px-3 py-3 my-4 gap-4 text-sm font-medium h-full">
      <h1 className="text-lg font-bold text-center mb-4">
        {course.title}
      </h1>
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
