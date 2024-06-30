import { db } from '@/modules/shared/presentation/connections/db';
import { GetLevel } from '../../application/GetLevel';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getLevel = async (levelId: string) => {
  const useCase = new GetLevel(new PrismaCourseRepository(db));
  const response = await useCase.run(levelId);
  return response.toPrimitives();
};
