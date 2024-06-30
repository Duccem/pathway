import { db } from '@/modules/shared/presentation/db';
import { GetLevels } from '../../application/GetLevels';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getLevels = async () => {
  const useCase = new GetLevels(new PrismaCourseRepository(db));
  const response = await useCase.run();
  return response.map((level) => level.toPrimitives());
};
