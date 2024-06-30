import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { db } from '@/modules/shared/presentation/connections/db';
import mux from '@/modules/shared/presentation/connections/mux';
import { CourseSection } from '@prisma/client';
import { UpdateCourseSection } from '../../application/UpdateCourseSection';
import { MuxVideoStoreService } from '../../infrastructure/MuxVideoStoreService';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const updateSection = async (courseId: string, sectionId: string, data: Primitives<CourseSection>) => {
  const useCase = new UpdateCourseSection(
    new PrismaCourseSectionRepository(db),
    new MuxVideoStoreService(mux)
  );

  await useCase.run(courseId, sectionId, data);
};
