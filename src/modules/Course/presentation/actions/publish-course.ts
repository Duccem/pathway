import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { PrismaCourseSectionRepository } from '@/modules/CourseSection/infrastructure/PrismaCourseSectionRepository';
import { db } from '@/modules/shared/presentation/connections/db';
import { PublishCourse } from '../../application/PublishCourse';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const publishCourse = async (courseId: string, userId: string) => {
  const useCase = new PublishCourse(
    new PrismaCourseRepository(db),
    new GetCourseAllSections(new PrismaCourseSectionRepository(db))
  );
  await useCase.run(courseId, userId);
};
