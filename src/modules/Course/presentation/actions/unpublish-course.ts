import { db } from '@/modules/shared/presentation/connections/db';
import { UnpublishCourse } from '../../application/UnpublishCourse';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const unpublishCourse = async (courseId: string, userId: string) => {
  const useCase = new UnpublishCourse(new PrismaCourseRepository(db));

  await useCase.run(courseId, userId);
};
