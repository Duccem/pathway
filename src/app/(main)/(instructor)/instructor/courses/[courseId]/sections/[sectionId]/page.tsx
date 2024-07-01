import IncompleteBanner from '@/app/(main)/(instructor)/_components/custom/IncompleteBanner';
import CourseSectionAccessForm from '@/app/(main)/(instructor)/_components/forms/chapters/chapter-access-form';
import CourseSectionDescriptionForm from '@/app/(main)/(instructor)/_components/forms/chapters/chapter-description-form';
import CourseSectionResourcesForm from '@/app/(main)/(instructor)/_components/forms/chapters/chapter-resources-form';
import CourseSectionTitleForm from '@/app/(main)/(instructor)/_components/forms/chapters/chapter-title-form';
import CourseSectionVideoForm from '@/app/(main)/(instructor)/_components/forms/chapters/chapter-video-form';
import { IconBadge } from '@/lib/custom/badge-icon';
import { getCourse } from '@/modules/Course/presentation/page-actions/get-course';
import { getCourseSection } from '@/modules/CourseSection/presentation/page-actions/get-course-section';
import DeleteButton from '@/modules/shared/presentation/components/DeleteCourse';
import PublishButton from '@/modules/shared/presentation/components/PublishButton';
import { auth } from '@clerk/nextjs/server';
import { BookMarked, Folder, Lock } from 'lucide-react';
import { redirect } from 'next/navigation';

interface CourseSectionDetailPageProps {
  params: {
    courseId: string;
    sectionId: string;
  };
}
const CourseSectionDetailPage = async ({ params: { courseId, sectionId } }: CourseSectionDetailPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const course = await getCourse(courseId, userId);

  if (!course) {
    return redirect('/instructor/courses');
  }

  const section = await getCourseSection(sectionId, courseId);
  if (!section) {
    return redirect(`/instructor/courses/${courseId}/sections`);
  }
  const requiredFields = [section.title, section.description, section.videoUrl];
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
            sectionId={sectionId}
            isPublished={section.isPublished}
            page={'section'}
          />
          <DeleteButton item="section" courseId={course.id} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Chapter details - {section.title}</h1>
        </div>
      </div>
      {!section.isPublished && (
        <IncompleteBanner
          completeFieldsCount={completedFieldsCount}
          isCompleted={isComplete}
          requiredFieldsCount={requiredFieldsCount}
        ></IncompleteBanner>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center justify-start gap-x-2">
            <IconBadge size="sm" icon={BookMarked} />
            <h2 className="text-xl">Customize the chapter</h2>
          </div>
          <CourseSectionTitleForm sectionId={sectionId} courseId={courseId} initialData={section} />
          <CourseSectionDescriptionForm sectionId={sectionId} courseId={courseId} initialData={section} />
          <CourseSectionVideoForm sectionId={sectionId} courseId={courseId} initialData={section} />
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="flex items-center justify-start gap-x-2">
              <IconBadge size="sm" icon={Lock} />
              <h2 className="text-xl">Chapter Accessability</h2>
            </div>
            <CourseSectionAccessForm courseId={courseId} sectionId={sectionId} initialData={section} />
          </div>
          <div>
            <div className="flex items-center justify-start gap-x-2">
              <IconBadge size="sm" icon={Folder} />
              <h2 className="text-xl">Chapter resources</h2>
            </div>
            <CourseSectionResourcesForm courseId={courseId} sectionId={sectionId} initialData={{ resources: section.resources }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSectionDetailPage;
