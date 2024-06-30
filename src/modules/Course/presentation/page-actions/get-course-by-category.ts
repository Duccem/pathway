import { db } from '@/modules/shared/presentation/db';
import { CoursesByCategory } from '../../application/CoursesByCategory';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getCourseByCategory = async (category: string) => {
  const useCase = new CoursesByCategory(new PrismaCourseRepository(db));
  const response = await useCase.run(category);
  return response.map((course) => course.toPrimitives());
};
