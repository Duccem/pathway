import { db } from '@/modules/shared/presentation/db';
import { GetCourseAllSections } from '../../application/GetCourseAllSections';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const getCourseSections = async (courseId: string) => {
  const useCase = new GetCourseAllSections(new PrismaCourseSectionRepository(db));
  const response = await useCase.run(courseId);
  return response.map((section) => section.toPrimitives());
};
