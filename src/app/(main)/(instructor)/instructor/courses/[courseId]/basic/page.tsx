import EditCourseForm from '@/components/course/EditCourseForm';
import IncompleteBanner from '@/components/course/IncompleteBanner';
import { getCategories } from '@/modules/Course/presentation/page-actions/get-categories';
import { getCourse } from '@/modules/Course/presentation/page-actions/get-course';
import { getLevels } from '@/modules/Course/presentation/page-actions/get-levels';
import { getCourseSections } from '@/modules/CourseSection/presentation/page-actions/get-course-sections';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface CourseBasicPageParams {
  params: {
    courseId: string;
  }
}
const CourseBasicPage = async ({ params: { courseId } }: CourseBasicPageParams) => {
  const { userId } = auth();
  if (!userId) return redirect('/sign-in');
  const course = await getCourse(courseId, userId);
  if (!course) return redirect('/instructor/courses');
  const categories = await getCategories();
  const levels = await getLevels();
  const sections = await getCourseSections(courseId);

  const requiredFields = [
    course.title,
    course.description, 
    course.categoryId, 
    course.subCategoryId, 
    course.levelId, 
    course.price, 
    course.imageUrl,
    sections.some(section => section.isPublished)
  ];
  const isComplete = requiredFields.every(Boolean);
  const requiredFieldsCount = requiredFields.length;
  const missingFieldsCount = requiredFields.filter(field => !Boolean(field)).length;
  return (
    <div className='px-10'>
      { !course.isPublished ? <IncompleteBanner isCompleted={isComplete} requiredFieldsCount={requiredFieldsCount} missingFieldsCount={missingFieldsCount}/> : null }
      <EditCourseForm
        course={course}
        categories={categories.map((category) => ({
          label: category.name,
          value: category.id,
          subcategories: category.subCategories.map((subcategory) => ({
            label: subcategory.name,
            value: subcategory.id
          }))
        }))}
        levels={levels.map((level) => ({ label: level.name, value: level.id }))}
        isComplete={isComplete}
      />
    </div>
  );
}

export default CourseBasicPage;
