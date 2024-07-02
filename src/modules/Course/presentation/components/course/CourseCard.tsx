import { getPurchase } from '@/modules/CoursePurchase/presentation/page-actions/get-purchase';
import { getCourseSections } from '@/modules/CourseSection/presentation/page-actions/get-course-sections';
import { getCourseSectionProgressCompletedCount } from '@/modules/CourseSectionProgress/presentation/get-course-sectio-progress-completed';
import { clerkClient } from '@clerk/nextjs/server';
import { Course } from '@prisma/client';

import { Badge } from '@/lib/ui/badge';
import { Progress } from '@/lib/ui/progress';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { getLevel } from '../../page-actions/get-level';

interface CourseCardProps {
  course: Course;
  studentId: string;
}
const CourseCard = async ({ course, studentId }: CourseCardProps) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);
  let level;
  if (course.levelId) {
    level = await getLevel(course.levelId);
  }
  const purchase = studentId ?  await getPurchase(studentId, course.id) : null;
  const sections = await getCourseSections(course.id);
  const publishedSections = sections.filter((section) => section.isPublished);
  const publishedSectionsIds = publishedSections.map((section) => section.id);
  const { count: completedSections } = studentId ?
    await getCourseSectionProgressCompletedCount(studentId, publishedSectionsIds) : { count: 0 };
  const progressPercentage = Math.round((completedSections / publishedSections.length) * 100);
  return (
    <Link href={`/courses/${course.id}/overview`} className="border rounded-lg cursor-pointe">
      <img
        src={course.imageUrl ? course.imageUrl : '/images/image_placeholder.webp'}
        alt={course.title}
        height={500}
        width={500}
        className="rounded-t-xl w-[320px] h-[180px] object-contain object-center"
      />
      <div className="px-4 py-3 flex flex-col gap-3">
        <h2 className="text-lg font-bold hover:text-[#9747FF]">{course.title}</h2>
        <div className="flex justify-between text-sm font-medium">
          {instructor && (
            <div className="flex gap-2 items-center">
              <img
                src={instructor.imageUrl ? instructor.imageUrl : '/images/avatar_placeholder.jpg'}
                alt={instructor.fullName || 'Instructor photo'}
                height={24}
                width={24}
                className="rounded-full"
              />
              <p className="">{instructor.fullName}</p>
            </div>
          )}

          {level && (
            <div>
              <Badge className="bg-[#22a094]">{level.name}</Badge>
            </div>
          )}
        </div>

        <div className="flex items-center justify-start gap-3 rounded-md bg-[#dfcbfa] px-3 mr-auto text-[#9747FF]">
          <BookOpen className="h-3 w-3" />
          <p className="text-sm font-bold">{publishedSections.length} chapters</p>
        </div>
        {!purchase ? (
          <p className="text-sm font-bold">${course.price}</p>
        ) : (
          <div className="">
            <Progress value={progressPercentage} className="h-2 " />
            <p className="text-xs mt-2 text-[#22a094]">
              %{progressPercentage} <span className="font-bold">completed</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
