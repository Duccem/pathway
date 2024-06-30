import { db } from '@/modules/shared/presentation/connections/db';
import { CoursesByCategory } from '../../application/CoursesByCategory';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getCoursesByCategory = async (category: string, userId: string) => {
  const useCase = new CoursesByCategory(new PrismaCourseRepository(db));
  const response = await useCase.run(category, userId);
  return response.map((course) => course.toPrimitives());
};
