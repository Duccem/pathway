import { db } from '@/modules/shared/presentation/db';
import { GetPurchase } from '../application/GetPurchase';
import { PrismaCoursePurchaseRepository } from '../infrastructure/PrismaCoursePurchaseRepository';

export const getPurchase = async (userId: string, courseId: string) => {
  const useCase = new GetPurchase(new PrismaCoursePurchaseRepository(db));
  const response = await useCase.run(userId, courseId);
  return response.toPrimitives();
};
