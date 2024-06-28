import { getCourse } from '@/lib/queries/courses';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import TopBar from '@/components/layout/TopBar'
import React from 'react';
import CourseSideBar from '@/components/layout/CourseSideBar';

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
  return (
    <div className='flex-1 flex '>
      <CourseSideBar course={course} studentId={userId}></CourseSideBar>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  );
}

export default CourseDetailLayout;
