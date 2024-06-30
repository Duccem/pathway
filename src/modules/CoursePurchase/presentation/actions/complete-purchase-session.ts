import { db } from '@/modules/shared/presentation/connections/db';
import stripe from '@/modules/shared/presentation/connections/stripe';
import { CompletePurchaseSession } from '../../application/CompletePurchaseSession';
import { PrismaCoursePurchaseRepository } from '../../infrastructure/PrismaCoursePurchaseRepository';
import { StripePurchaseService } from '../../infrastructure/StripePurchaseService';

export const completePurchaseSession = async (rawBody: string, signature: string) => {
  const useCase = new CompletePurchaseSession(
    new PrismaCoursePurchaseRepository(db),
    new StripePurchaseService(stripe)
  );
  await useCase.run(rawBody, signature);
};
