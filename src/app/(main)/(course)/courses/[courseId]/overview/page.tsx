import CourseSectionMenu from "@/components/layout/CourseSectionMenu";
import ReadText from "@/components/shared/ReadText";
import { getCourse } from "@/lib/queries/courses";
import { getLevel } from "@/lib/queries/levels";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CourseOverviewPageProps {
  courseId: string;
}
const CourseOverviewPage = async ({ params: { courseId } }: { params: CourseOverviewPageProps }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/sign-in')
  }
  const course = await getCourse(courseId, userId)
  if (!course) {
    return redirect('/')
  }
  const instructor = await clerkClient.users.getUser(course.instructorId);
  const level = await getLevel(course.levelId || '');
  return (
    <div className="px-6 py-4 flex flex-col gap-5 text-sm">
      <div className="flex flex-col justify-center gap-2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <CourseSectionMenu course={course} />
        </div>
        <p className="font-medium">
          {course.subtitle}
        </p>
        <div className="flex gap-3 items-center">
          <p className="font-bold">Instructor:</p>
          <img
            src={instructor.imageUrl ? instructor.imageUrl : '/images/avatar_placeholder.jpg'}
            alt={instructor.fullName || 'Instructor photo'}
            height={30}
            width={30}
            className="rounded-full border-gray-600 border"
          />
          <p>{instructor.fullName}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Price:</p>
          <p>${course.price}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Level:</p>
          <p>{level?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Description:</p>
          <ReadText
            value={course.description || ''}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseOverviewPage;
