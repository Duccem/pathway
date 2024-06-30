
import { Button } from '@/lib/ui/button';
import { getCourse } from '@/modules/Course/presentation/page-actions/get-course';
import { getLevel } from '@/modules/Course/presentation/page-actions/get-level';
import CourseSectionMenu from '@/modules/CourseSection/presentation/components/CourseSectionMenu';
import { getCourseSections } from '@/modules/CourseSection/presentation/page-actions/get-course-sections';
import { getSectionVideoData } from '@/modules/CourseSection/presentation/page-actions/get-section-viode-data';
import ReadText from '@/modules/shared/presentation/components/ReadText';
import { auth, clerkClient } from '@clerk/nextjs/server';
import MuxPlayer from '@mux/mux-player-react';
import { CirclePlay } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface CourseOverviewPageProps {
  courseId: string;
}
const CourseOverviewPage = async ({
  params: { courseId },
}: {
  params: CourseOverviewPageProps;
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  const course = await getCourse(courseId, userId);
  if (!course) {
    return redirect('/');
  }
  const sections = await getCourseSections(courseId);
  const muxData = await getSectionVideoData(sections[0].id);
  const instructor = await clerkClient.users.getUser(course.instructorId);
  const level = await getLevel(course.levelId || '');
  return (
    <div className="px-6 py-4 flex flex-col gap-5 text-sm">
      <div className="flex flex-col justify-center gap-2">
        <img
          src={course.imageUrl || ''}
          alt={course.title}
          className="w-full h-[250px] object-cover"
        />
        <CourseSectionMenu course={{...course, sections}} />
        <div className="flex max-sm:flex-col">
          <div className="flex-1">
            <div className="flex gap-2 text-xl font-bold">
              <p className="font-bold">Price:</p>
              <p>${course.price}</p>
            </div>
            <div className="flex justify-start items-center mt-2">
              <h1 className="text-2xl font-bold mr-2">{course.title} </h1>
              <p className='text-xl'> - {level?.name}</p>
            </div>
            <p className="font-medium text-xl">{course.subtitle}</p>
            <div className="flex flex-col gap-2 mt-2">
              <p className="font-bold">Description:</p>
              <div className="w-4/5">
                <ReadText value={course.description || ''} />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-3 my-2">
              <p className="font-bold">Instructor:</p>
              <div className="flex gap-3 items-center">
                <img
                  src={
                    instructor.imageUrl
                      ? instructor.imageUrl
                      : '/images/avatar_placeholder.jpg'
                  }
                  alt={instructor.fullName || 'Instructor photo'}
                  height={50}
                  width={50}
                  className="rounded-full border-gray-600 border"
                />
                <p>{instructor.fullName}</p>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-5 items-start justify-start">
              <MuxPlayer
                playbackId={muxData?.playbackId || ''}
                className="md:max-w-[400px] border-2 rounded-lg border-[#9747FF]"
              />
              <Link
                href={`/courses/${courseId}/section/${sections[0].id}`}
              >
                <Button>
                  <CirclePlay className="h-4 w-4 mr-2" />
                  Start Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewPage;
