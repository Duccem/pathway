import { db } from '@/modules/shared/presentation/db';
import mux from '@/modules/shared/presentation/mux';
import { DeleteSectionOnDeleteCourse } from '../application/DeleteSectionOnDeleteCourse';
import { MuxVideoStoreService } from '../infrastructure/MuxVideoStoreService';
import { PrismaCourseSectionRepository } from '../infrastructure/PrismaCourseSectionRepository';

export const deleteSectionEvent = async (courseId: string) => {
  const useCase = new DeleteSectionOnDeleteCourse(
    new PrismaCourseSectionRepository(db),
    new MuxVideoStoreService(mux)
  );
  await useCase.run(courseId);
};
