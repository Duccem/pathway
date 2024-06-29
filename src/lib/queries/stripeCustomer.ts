import { db } from '../db';

export const getStripeCustomer = async (customerId: string) => {
  const customer = await db.stripeCustomer.findUnique({
    where: {
      customerId,
    },
    select: {
      externalId: true,
    },
  });
  return customer;
};

export const createStripeCustomer = async (customerId: string, externalId: string) => {
  const customer = await db.stripeCustomer.create({
    data: {
      customerId,
      externalId,
    },
  });
  return customer;
};
