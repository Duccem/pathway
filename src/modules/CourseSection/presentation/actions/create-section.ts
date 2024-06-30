import { db } from '@/modules/shared/presentation/connections/db';
import { CreateSection } from '../../application/CreateSection';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const createSection = async (id: string, title: string, courseId: string) => {
  const useCase = new CreateSection(new PrismaCourseSectionRepository(db));

  await useCase.run(id, title, courseId);
};
