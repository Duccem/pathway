import { db } from '@/modules/shared/presentation/db';
import { GetUserCourseSectionProgress } from '../application/GetUserCourseSectionProgress';
import { PrismaCourseSectionProgressRepository } from '../infrastructure/PrismaCourseSectionProgressRepository';

export const getUserProgress = async (userId: string, sectionId: string) => {
  const useCase = new GetUserCourseSectionProgress(new PrismaCourseSectionProgressRepository(db));
  const response = await useCase.run(userId, sectionId);
  return response.toPrimitives();
};
