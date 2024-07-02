import CourseCard from '@/modules/Course/presentation/components/course/CourseCard';
import { getDashboardCourses } from '@/modules/Course/presentation/page-actions/get-dashboard-courses';
import { auth } from '@clerk/nextjs/server';
import { CheckCircle, Clock, StopCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import InfoCard from '../_components/info-card';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/browse');
  }
  const { coursesCompleted, coursesInProgress, coursesNotStarted } = await getDashboardCourses(userId);
  const courses = [...coursesInProgress, ...coursesNotStarted, ...coursesCompleted];
  return (
    <div className="p-6 space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
        <div>
          <InfoCard icon={Clock} label='In Progress' numberOfItems={coursesInProgress.length}/>
        </div>
        <div>
          <InfoCard icon={CheckCircle} label='Completed' numberOfItems={coursesCompleted.length} variant='success'/>
        </div>
        <div>
          <InfoCard icon={StopCircle} label='Not started' numberOfItems={coursesNotStarted.length} variant='warning'/>
        </div>
        
      </div>
      <div>
          <h1 className='text-2xl font-bold my-5'>Your courses</h1>
          <div className="flex flex-wrap gap-7 justify-start">
            {courses.map((course) => <CourseCard key={course.id} course={course} studentId={userId} />)}
          </div>
        </div>
    </div>
  );
}
