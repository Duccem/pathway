import { db } from '@/modules/shared/presentation/db';
import { GetCourse } from '../../application/GetCourse';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getCourse = async (courseId: string, userId: string) => {
  const useCase = new GetCourse(new PrismaCourseRepository(db));
  const response = await useCase.run(courseId, userId);
  return response.toPrimitives();
};
