import { QStashEventBus } from '@/modules/shared/infrastructure/events/QStashEventBus';
import { db } from '@/modules/shared/presentation/connections/db';
import mux from '@/modules/shared/presentation/connections/mux';
import qstashClient from '@/modules/shared/presentation/connections/qstash';
import { DeleteSection } from '../../application/DeleteSection';
import { MuxVideoStoreService } from '../../infrastructure/MuxVideoStoreService';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const deleteSection = async (courseId: string, sectionId: string, userId: string) => {
  const useCase = new DeleteSection(
    new PrismaCourseSectionRepository(db),
    new MuxVideoStoreService(mux),
    new QStashEventBus(qstashClient)
  );

  await useCase.run(courseId, sectionId, userId);
};
