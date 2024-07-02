import { GetPurchases } from '@/modules/CoursePurchase/application/GetPurchases';
import { PrismaCoursePurchaseRepository } from '@/modules/CoursePurchase/infrastructure/PrismaCoursePurchaseRepository';
import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { PrismaCourseSectionRepository } from '@/modules/CourseSection/infrastructure/PrismaCourseSectionRepository';
import { GetCourseProgress } from '@/modules/CourseSectionProgress/application/GetCourseProgress';
import { PrismaCourseSectionProgressRepository } from '@/modules/CourseSectionProgress/infrastructure/PrismaCourseSectionProgressRepository';
import { db } from '@/modules/shared/presentation/connections/db';
import { GetStudentCoursesData } from '../../application/GetStudentCoursesData';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getDashboardCourses = async (studentId: string) => {
  const useCase = new GetStudentCoursesData(
    new PrismaCourseRepository(db),
    new GetPurchases(new PrismaCoursePurchaseRepository(db)),
    new GetCourseProgress(
      new PrismaCourseSectionProgressRepository(db),
      new GetCourseAllSections(new PrismaCourseSectionRepository(db))
    )
  );
  return await useCase.run(studentId);
};
