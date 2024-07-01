import CourseCategoryForm from '@/app/(main)/(instructor)/_components/forms/course/course-category-form';
import CourseDescriptionForm from '@/app/(main)/(instructor)/_components/forms/course/course-description-form';
import CourseImageForm from '@/app/(main)/(instructor)/_components/forms/course/course-image-form';
import CourseLevelForm from '@/app/(main)/(instructor)/_components/forms/course/course-level-form';
import CoursePriceForm from '@/app/(main)/(instructor)/_components/forms/course/course-price-form';
import CourseSectionForm from '@/app/(main)/(instructor)/_components/forms/course/course-sections-form';
import CourseSubtitleForm from '@/app/(main)/(instructor)/_components/forms/course/course-subtitle-form';
import CourseTitleForm from '@/app/(main)/(instructor)/_components/forms/course/course-title-form';
import { IconBadge } from '@/lib/custom/badge-icon';
import { getCategories } from '@/modules/Course/presentation/page-actions/get-categories';
import { getCourse } from '@/modules/Course/presentation/page-actions/get-course';
import { getLevels } from '@/modules/Course/presentation/page-actions/get-levels';
import { getCourseSections } from '@/modules/CourseSection/presentation/page-actions/get-course-sections';
import DeleteButton from '@/modules/shared/presentation/components/DeleteCourse';
import PublishButton from '@/modules/shared/presentation/components/PublishButton';
import { auth } from '@clerk/nextjs/server';
import { BookText, CircleDollarSign, Gem, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import IncompleteBanner from '../../../_components/custom/IncompleteBanner';

interface CourseBasicPageParams {
  params: {
    courseId: string;
  };
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
    sections.some((section) => section.isPublished),
  ];
  const isComplete = requiredFields.every(Boolean);
  const requiredFieldsCount = requiredFields.length;
  const completedFieldsCount = requiredFields.filter(Boolean).length;
  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <div className="flex gap-4 items-start">
          <PublishButton
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
            page={'course'}
          />
          <DeleteButton item="course" courseId={course.id} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
        </div>
      </div>
      {!course.isPublished && (
        <IncompleteBanner
          completeFieldsCount={completedFieldsCount}
          isCompleted={isComplete}
          requiredFieldsCount={requiredFieldsCount}
        ></IncompleteBanner>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center justify-start gap-x-2">
            <IconBadge size="sm" icon={BookText} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <CourseTitleForm initialData={course} courseId={course.id} />
          <CourseSubtitleForm initialData={course} courseId={course.id} />
          <CourseDescriptionForm initialData={course} courseId={courseId} />
          <CourseImageForm initialData={course} courseId={courseId} />
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="flex items-center justify-start gap-x-2">
              <IconBadge size="sm" icon={ListChecks} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <CourseSectionForm initialData={{ sections }} courseId={courseId} />
          </div>
          <div>
            <div className="flex items-center justify-start gap-x-2">
              <IconBadge size="sm" icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <CoursePriceForm initialData={course} courseId={courseId} />
          </div>
          <div>
            <div className="flex items-center justify-start gap-x-2">
              <IconBadge size="sm" icon={Gem} />
              <h2 className="text-xl">The important complementary data</h2>
            </div>
            <CourseCategoryForm
              initialData={course}
              courseId={courseId}
              categories={categories.map((category) => ({
                label: category.name,
                value: category.id,
                subcategories: category.subcategories.map((subcategory) => ({
                  label: subcategory.name,
                  value: subcategory.id,
                })),
              }))}
            />
            <CourseLevelForm
              initialData={course}
              courseId={courseId}
              levels={levels.map((level) => ({
                label: level.name,
                value: level.id,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicPage;
