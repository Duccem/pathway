import { db } from '../db';

export const getStripeCustomer = async (customerId: string) => {
  const customer = await db.stripeCustomer.findUnique({
    where: {
      customerId,
    },
    select: {
      stripeCustomerId: true,
    },
  });
  return customer;
};

export const createStripeCustomer = async (
  customerId: string,
  stripeCustomerId: string
) => {
  const customer = await db.stripeCustomer.create({
    data: {
      customerId,
      stripeCustomerId,
    },
  });
  return customer;
};
