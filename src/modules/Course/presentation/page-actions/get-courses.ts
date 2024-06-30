import { db } from '@/modules/shared/presentation/connections/db';
import { GetAllMyCourses } from '../../application/GetAllMyCourses';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getCourses = async (userId: string) => {
  const useCase = new GetAllMyCourses(new PrismaCourseRepository(db));
  const response = await useCase.run(userId);
  return response.map((course) => course.toPrimitives());
};
