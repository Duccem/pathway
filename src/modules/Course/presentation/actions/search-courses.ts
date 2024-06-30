import { db } from '@/modules/shared/presentation/connections/db';
import { SearchCourses } from '../../application/SearchCourses';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const searchCourses = async (search: string, userId: string) => {
  const useCase = new SearchCourses(new PrismaCourseRepository(db));
  const courses = await useCase.run(search, userId);
  return courses.map((course) => course.toPrimitives());
};
