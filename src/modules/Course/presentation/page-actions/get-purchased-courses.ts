import { GetPurchases } from '@/modules/CoursePurchase/application/GetPurchases';
import { PrismaCoursePurchaseRepository } from '@/modules/CoursePurchase/infrastructure/PrismaCoursePurchaseRepository';
import { db } from '@/modules/shared/presentation/connections/db';
import { GetPurchasedCourses } from '../../application/GetPurchasedCourses';
import { PrismaCourseRepository } from '../../infrastructure/PrismaCourseRepository';

export const getPurchasedCourses = async (userId: string) => {
  const useCase = new GetPurchasedCourses(
    new PrismaCourseRepository(db),
    new GetPurchases(new PrismaCoursePurchaseRepository(db))
  );
  const response = await useCase.run(userId);
  return response.map((course) => course.toPrimitives());
};
