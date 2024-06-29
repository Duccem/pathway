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

export const getPurchasedCourses = async (customerId: string) => {
  const purchasedCourses = await db.coursePurchase.findMany({
    where: {
      customerId,
    },
    select: {
      course: {
        include: {
          category: true,
          subCategory: true,
          sections: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });
  return purchasedCourses;
};
