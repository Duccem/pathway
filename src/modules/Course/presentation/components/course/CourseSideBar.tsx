import { Progress } from '@/lib/ui/progress';
import { getPurchase } from '@/modules/CoursePurchase/presentation/page-actions/get-purchase';
import { getCourseSectionProgressCompletedCount } from '@/modules/CourseSectionProgress/presentation/get-course-sectio-progress-completed';
import { Course, CourseSection } from '@prisma/client';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface CourseSideBarProps {
  course: Course & { sections: CourseSection[] };
  studentId: string;
}
const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
  const publishedSections = course.sections.filter((section) => section.isPublished);
  const publishedSectionsIds = publishedSections.map((section) => section.id);
  const purchase = await getPurchase(studentId, course.id);
  const { count: completedSections, sectionsIds: completedSectionsIds } =
    await getCourseSectionProgressCompletedCount(studentId, publishedSectionsIds);
  const progressPercentage = Math.round((completedSections / publishedSections.length) * 100);
  return (
    <div className="max-sm:hidden flex flex-col w-64 px-3 py-3 my-4 gap-4 text-sm font-medium h-full">
      <h1 className="text-lg font-bold text-center mb-4">{course.title}</h1>
      {purchase && (
        <div className="mx-3">
          <Progress value={progressPercentage} className="h-2 " />
          <p className="text-xs mt-2 text-[#22a094]">
            %{progressPercentage} <span className="font-bold">completed</span>
          </p>
        </div>
      )}
      <Link href={`/courses/${course.id}/overview`} className="p-3 rounded-lg hover:bg-[#dfcbfa]">
        Overview
      </Link>
      <p className="pl-3 text-sm font-bold text-[#9747FF] mt-4">TEMARIO</p>
      {publishedSections.map((section) => (
        <Link
          href={`/courses/${course.id}/section/${section.id}`}
          key={section.id}
          className="p-3 rounded-lg hover:bg-[#dfcbfa]"
        >
          {!purchase && !section.isFree ? (
            <div className="flex justify-start items-center">
              <Lock className="h-4 w-4 mr-2" />
              <p>{section.title}</p>
            </div>
          ) : (
            <>
              {completedSectionsIds.includes(section.id) ? (
                <div className="text-[#22a094] flex justify-start items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <p>{section.title}</p>
                </div>
              ) : (
                <div className="flex justify-start items-center">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  <p>{section.title}</p>
                </div>
              )}
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default CourseSideBar;
