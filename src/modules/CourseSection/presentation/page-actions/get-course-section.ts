import { db } from '@/modules/shared/presentation/db';
import { GetSection } from '../../application/GetSection';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const getCourseSection = async (sectionId: string, courseId: string) => {
  const useCase = new GetSection(new PrismaCourseSectionRepository(db));
  const response = await useCase.run(courseId, sectionId);
  return response.toPrimitives();
};
