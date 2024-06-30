import { db } from '@/modules/shared/presentation/db';
import { SearchCourses } from '../../application/SearchCourses';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const searchCourses = async (search: string) => {
  const useCase = new SearchCourses(new PrismaCourseRepository(db));
  const courses = await useCase.run(search);
  return courses.map((course) => course.toPrimitives());
};
