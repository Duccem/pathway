import { db } from '@/modules/shared/presentation/connections/db';
import { GetSectionResources } from '../../application/GetSectionResources';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const getSectionResources = async (sectionId: string) => {
  const useCase = new GetSectionResources(new PrismaCourseSectionRepository(db));
  const response = await useCase.run(sectionId);
  return response.map((resource) => resource.toPrimitives());
};
