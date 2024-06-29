import { Course, CoursePurchase } from '@prisma/client';
import { db } from '../db';

export const getLevels = async () => {
  const levels = await db.level.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return levels;
};

export const getLevel = async (id: string) => {
  const level = await db.level.findUnique({
    where: {
      id,
    },
  });
  return level;
};

type PurchaseWithCourse = CoursePurchase & { course: Course };

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: { total: number; count: number } } =
    {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = { total: 0, count: 0 };
    }
    grouped[courseTitle].total += purchase.course.price!;
    grouped[courseTitle].count += 1;
  });

  return grouped;
};

export const getCoursePerformance = async (instructorId: string) => {
  try {
    const purchases = await db.coursePurchase.findMany({
      where: { course: { instructorId } },
      include: { course: true },
    });

    const groupedEarnings = groupByCourse(purchases);

    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, { total, count }]) => ({
        name: courseTitle,
        total,
        count,
      })
    );

    const totalRevenue = data.reduce((acc, current) => acc + current.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (err) {
    console.log('[getPerformance]', err);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
