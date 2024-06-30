import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { db } from '@/modules/shared/presentation/db';
import { UpdateCourse } from '../../application/UpdateCourse';
import { Course } from '../../domain/Course';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const updateCourse = async (values: Primitives<Course>, courseId: string, userId: string) => {
  const useCase = new UpdateCourse(new PrismaCourseRepository(db));
  await useCase.run(courseId, userId, values);
};
