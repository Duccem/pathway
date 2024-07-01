import { Badge } from '@/lib/ui/badge';
import CourseCardList from '@/modules/Course/presentation/components/course/CourseCardList';
import PurchaseCourse from '@/modules/Course/presentation/components/course/PurchaseCourse';
import { getCourse } from '@/modules/Course/presentation/page-actions/get-course';
import { getCourses } from '@/modules/Course/presentation/page-actions/get-courses';
import { getLevel } from '@/modules/Course/presentation/page-actions/get-level';
import { getPurchase } from '@/modules/CoursePurchase/presentation/page-actions/get-purchase';
import CourseSectionMenu from '@/modules/CourseSection/presentation/components/CourseSectionMenu';
import { getCourseSections } from '@/modules/CourseSection/presentation/page-actions/get-course-sections';
import ReadText from '@/modules/shared/presentation/components/ReadText';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface CourseOverviewPageProps {
  courseId: string;
}

const levelIcon = {
  beginner: <Badge className="bg-[#22a094]">beginner</Badge>,
  intermediate: <Badge className="bg-[#22a094]">intermediate</Badge>,
  advanced: <Badge className="bg-[#22a094]">avanced</Badge>,
};
const CourseOverviewPage = async ({ params: { courseId } }: { params: CourseOverviewPageProps }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  const course = await getCourse(courseId, userId);
  if (!course) {
    return redirect('/');
  }
  const otherCourses = await getCourses(course.instructorId);
  const purchase = await getPurchase(userId, courseId);
  const sections = await getCourseSections(courseId);
  const instructor = await clerkClient.users.getUser(course.instructorId);
  const level = await getLevel(course.levelId || '');
  return (
    <div className="px-6 py-4 flex flex-col gap-5 text-sm">
      <div className="flex flex-col justify-center gap-2">
        <img src={course.imageUrl || ''} alt={course.title} className="w-full h-[125px] object-cover" />
        <CourseSectionMenu course={{ ...course, sections }} />
        <div className="flex mt-5 max-sm:flex-col">
          <div className="flex-1">
            <div className="flex gap-2 text-xl font-bold">
              <p className="font-bold">Price:</p>
              <p>${course.price}</p>
            </div>
            <div className="flex justify-start items-center mt-2">
              <h1 className="text-2xl font-bold mr-2">{course.title} </h1>
              <p>{levelIcon[level.name.toLowerCase()]}</p>
            </div>
            <p className="font-medium text-xl">{course.subtitle}</p>
            <div className="flex flex-col gap-2 mt-2">
              <p className="font-bold">Description:</p>
              <div className="w-4/5">
                <ReadText value={course.description || ''} />
              </div>
            </div>
            <div className="py-5 flex flex-col gap-5 items-start justify-start">
              <video src={sections[0].videoUrl || ''} className="md:max-w-[600px] rounded-lg" controls/>
              {!purchase && <PurchaseCourse courseId={courseId} />}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-3 my-2">
              <p className="font-bold">Instructor:</p>
              <div className="flex gap-3 items-center">
                <img
                  src={instructor.imageUrl ? instructor.imageUrl : '/images/avatar_placeholder.jpg'}
                  alt={instructor.fullName || 'Instructor photo'}
                  height={50}
                  width={50}
                  className="rounded-full border-gray-600 border"
                />
                <p>{instructor.fullName}</p>
              </div>
              {
                otherCourses.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Other courses by this instructor:</p>
                    <div className="flex gap-2">
                      {otherCourses.slice(0,3).filter((otherCourse) => otherCourse.isPublished && course.id !== courseId).map((otherCourse) => (
                        <CourseCardList key={otherCourse.id} course={otherCourse} />
                      ))}
                    </div>
                  </div>
                )
              
              }
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewPage;
