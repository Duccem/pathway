import { db } from '@/modules/shared/presentation/connections/db';
import { FilterCoursesByCategoryAndTerm } from '../../application/FilterCoursesByCategoryAndTerm';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getCoursesByFilters = async (userId: string, categoryId: string, term: string) => {
  const useCase = new FilterCoursesByCategoryAndTerm(new PrismaCourseRepository(db));
  const response = await useCase.run(categoryId, term, userId);
  return response.map((course) => course.toPrimitives());
};
