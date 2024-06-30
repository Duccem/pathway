import { db } from '@/modules/shared/presentation/db';
import { GetPurchasePerformance } from '../application/GetPurchasePerformance';
import { PrismaCoursePurchaseRepository } from '../infrastructure/PrismaCoursePurchaseRepository';

export const getPerformance = async (userId: string) => {
  const useCase = new GetPurchasePerformance(new PrismaCoursePurchaseRepository(db));
  return await useCase.run(userId);
};
