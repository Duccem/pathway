import { db } from '@/modules/shared/presentation/db';
import { ToggleCourseSectionProgress } from '../application/CreateCourseSectionProgress';
import { PrismaCourseSectionProgressRepository } from '../infrastructure/PrismaCourseSectionProgressRepository';

export const toggleProgress = async (userId: string, sectionId: string, isCompleted: boolean) => {
  const useCase = new ToggleCourseSectionProgress(new PrismaCourseSectionProgressRepository(db));
  await useCase.run(userId, sectionId, isCompleted);
};
