import { GetCourse } from '@/modules/Course/application/GetCourse';
import { PrismaCourseRepository } from '@/modules/Course/infrastructure/PrismaCourseRepository';
import { db } from '@/modules/shared/presentation/db';
import stripe from '@/modules/shared/presentation/stripe';
import { CreatePurchaseSession } from '../application/CreatePurchaseSession';
import { PrismaCoursePurchaseRepository } from '../infrastructure/PrismaCoursePurchaseRepository';
import { StripePurchaseService } from '../infrastructure/StripePurchaseService';

export const createPurchaseSession = async (userId: string, userEmail: string, courseId: string) => {
  const useCase = new CreatePurchaseSession(
    new PrismaCoursePurchaseRepository(db),
    new StripePurchaseService(stripe),
    new GetCourse(new PrismaCourseRepository(db))
  );

  const response = await useCase.run(userId, userEmail, courseId);
  return response;
};
