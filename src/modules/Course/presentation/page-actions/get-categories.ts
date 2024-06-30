import { db } from '@/modules/shared/presentation/db';
import { GetCategories } from '../../application/GetCategories';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getCategories = async () => {
  const useCase = new GetCategories(new PrismaCourseRepository(db));
  const response = await useCase.run();
  return response.map((category) => category.toPrimitives());
};
