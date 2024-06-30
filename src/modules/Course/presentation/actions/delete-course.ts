import { QStashEventBus } from '@/modules/shared/infrastructure/events/QStashEventBus';
import { db } from '@/modules/shared/presentation/connections/db';
import qstashClient from '@/modules/shared/presentation/connections/qstash';
import { DeleteCourse } from '../../application/DeleteCourse';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const deleteCourse = async (courseId: string, userId: string) => {
  const useCase = new DeleteCourse(new PrismaCourseRepository(db), new QStashEventBus(qstashClient));
  await useCase.run(courseId, userId);
};
