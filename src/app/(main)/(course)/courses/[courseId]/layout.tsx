
import CourseSideBar from '@/modules/Course/presentation/components/course/CourseSideBar';
import { getCourse } from '@/modules/Course/presentation/page-actions/get-course';
import { getCourseSections } from '@/modules/CourseSection/presentation/page-actions/get-course-sections';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface CourseDetailLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseDetailLayout = async ({ children, params: { courseId } }: CourseDetailLayoutProps) => {
  const { userId } = auth()
  if (!userId) {
    return redirect('/sign-in')
  }
  const course = await getCourse(courseId, userId)
  if (!course) {
    return redirect('/')
  }
  const sections = await getCourseSections(courseId)
  return (
    <div className='flex-1 flex '>
      <CourseSideBar course={{...course, sections}} studentId={userId}></CourseSideBar>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  );
}

export default CourseDetailLayout;
