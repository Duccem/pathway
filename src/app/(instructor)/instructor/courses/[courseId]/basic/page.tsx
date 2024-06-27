import EditCourseForm from '@/components/course/EditCourseForm';
import { getCategories } from '@/lib/queries/categories';
import { getCourse } from '@/lib/queries/courses';
import { getLevels } from '@/lib/queries/levels';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface CourseBasicPageParams {
  params:{
    courseId: string;
  }
}
const CourseBasicPage = async ({ params: { courseId } }: CourseBasicPageParams) => {
  const { userId } = auth();
  if(!userId) return redirect('/sign-in');
  const course = await getCourse(courseId, userId);
  if(!course) return redirect('/instructor/courses');
  const categories = await getCategories();
  const levels = await getLevels();
  return (
    <div className='px-10'>
      <EditCourseForm 
        course={course} 
        categories={categories.map((category) => ({ 
          label: category.name, 
          value: category.id,
          subcategories: category.subcategories.map((subcategory) => ({
            label: subcategory.name,
            value: subcategory.id
          }))
        }))}
        levels={levels.map((level) => ({ label: level.name, value: level.id }))}
      />
    </div>
  );
}

export default CourseBasicPage;
