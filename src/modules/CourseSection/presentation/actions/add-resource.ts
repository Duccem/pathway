import { db } from '@/modules/shared/presentation/connections/db';
import { AddResource } from '../../application/AddResource';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const addResource = async (courseId: string, sectionId: string, name: string, fileUrl: string) => {
  const useCase = new AddResource(new PrismaCourseSectionRepository(db));
  await useCase.run(courseId, sectionId, name, fileUrl);
};
