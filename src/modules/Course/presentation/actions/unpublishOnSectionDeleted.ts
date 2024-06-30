import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { PrismaCourseSectionRepository } from '@/modules/CourseSection/infrastructure/PrismaCourseSectionRepository';
import { db } from '@/modules/shared/presentation/connections/db';
import { UnpublishCourseOnDeleteLastSection } from '../../application/UnpublishCourseOnDeleteLastSection';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const unpublishOnSectionDeleted = async (courseId: string, userId: string) => {
  const useCase = new UnpublishCourseOnDeleteLastSection(
    new PrismaCourseRepository(db),
    new GetCourseAllSections(new PrismaCourseSectionRepository(db))
  );
  await useCase.run(courseId, userId);
};
