import { db } from '@/modules/shared/presentation/db';
import { PublishSection } from '../../application/PublishSection';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const publishSection = async (courseId: string, sectionId: string) => {
  const useCase = new PublishSection(new PrismaCourseSectionRepository(db));
  await useCase.run(courseId, sectionId);
};
