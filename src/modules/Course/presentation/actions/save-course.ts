import { db } from '@/modules/shared/presentation/db';
import { CreateCourse } from '../../application/CreateCourse';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const saveCourse = async ({
  title,
  categoryId,
  subCategoryId,
  userId,
  id,
}: {
  id: string;
  title: string;
  categoryId: string;
  subCategoryId: string;
  userId: string;
}) => {
  const useCase = new CreateCourse(new PrismaCourseRepository(db));
  await useCase.run(id, title, categoryId, subCategoryId, userId);
};
