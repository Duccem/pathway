import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { db } from '@/modules/shared/presentation/db';
import { ReorderSection } from '../../application/ReorderSection';
import { CourseSection } from '../../domain/CourseSection';
import { PrismaCourseSectionRepository } from '../../infrastructure/PrismaCourseSectionRepository';

export const reorderSection = async (list: Primitives<CourseSection>[]) => {
  const useCase = new ReorderSection(new PrismaCourseSectionRepository(db));
  await useCase.run(list);
};
