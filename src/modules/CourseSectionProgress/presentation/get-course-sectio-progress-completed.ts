import { db } from '@/modules/shared/presentation/connections/db';
import { GetCourseSectionProgressCompletedCount } from '../application/GetCourseSectionProgressCompletedCount';
import { PrismaCourseSectionProgressRepository } from '../infrastructure/PrismaCourseSectionProgressRepository';

export const getCourseSectionProgressCompletedCount = async (courseId: string, sectionsIds: string[]) => {
  const useCase = new GetCourseSectionProgressCompletedCount(new PrismaCourseSectionProgressRepository(db));
  const response = await useCase.run(courseId, sectionsIds);
  return response;
};
