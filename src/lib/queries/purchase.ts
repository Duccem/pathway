import { db } from '../db';

export const getPurchase = async (customerId: string, courseId: string) => {
  const purchase = await db.coursePurchase.findUnique({
    where: {
      customerId_courseId: {
        customerId,
        courseId,
      },
    },
  });
  return purchase;
};

export const createPurchase = async (customerId: string, courseId: string) => {
  await db.coursePurchase.create({
    data: {
      customerId,
      courseId,
    },
  });
};
