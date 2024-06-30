import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { PrismaCourseSectionRepository } from '@/modules/CourseSection/infrastructure/PrismaCourseSectionRepository';
import { db } from '@/modules/shared/presentation/db';
import { UnpublishCourseOnUnpublishLastSection } from '../../application/UnpublishCourseOnUnpublishLastSection';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const unpublishOnSectionUnpublished = async (courseId: string, userId: string) => {
  const useCase = new UnpublishCourseOnUnpublishLastSection(
    new PrismaCourseRepository(db),
    new GetCourseAllSections(new PrismaCourseSectionRepository(db))
  );
  await useCase.run(courseId, userId);
};
