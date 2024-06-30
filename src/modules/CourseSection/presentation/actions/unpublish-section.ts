import { QStashEventBus } from '@/modules/shared/infrastructure/events/QStashEventBus';
import { db } from '@/modules/shared/presentation/connections/db';
import qstashClient from '@/modules/shared/presentation/connections/qstash';
import { UnpublishSection } from '../../application/UnpublishSection';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const unpublishSection = async (courseId: string, sectionId: string, userId: string) => {
  const useCase = new UnpublishSection(
    new PrismaCourseSectionRepository(db),
    new QStashEventBus(qstashClient)
  );
  await useCase.run(courseId, sectionId, userId);
};
