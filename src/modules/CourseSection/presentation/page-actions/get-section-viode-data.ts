import { db } from '@/modules/shared/presentation/connections/db';
import { GetVideoData } from '../../application/GetVideoData';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const getSectionVideoData = async (sectionId: string) => {
  const useCase = new GetVideoData(new PrismaCourseSectionRepository(db));
  const response = await useCase.run(sectionId);
  return response.toPrimitives();
};
