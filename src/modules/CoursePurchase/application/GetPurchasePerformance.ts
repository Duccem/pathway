import { CoursePurchaseRepository, PurchaseWithCourse } from '../domain/CoursePurchaseRepository';

export class GetPurchasePerformance {
  constructor(private repository: CoursePurchaseRepository) {}

  async run(instructorId: string) {
    const purchases = await this.repository.getPurchasedCourses(instructorId);
    const groupedEarnings = this.groupByCourse(purchases);

    const data = Object.entries(groupedEarnings).map(([courseTitle, { total, count }]) => ({
      name: courseTitle,
      total,
      count,
    }));
    const totalRevenue = data.reduce((acc, current) => acc + current.total, 0);
    const totalSales = purchases.length;
    return {
      data,
      totalRevenue,
      totalSales,
    };
  }
  groupByCourse(purchases: PurchaseWithCourse[]) {
    const grouped: { [courseTitle: string]: { total: number; count: number } } = {};

    purchases.forEach((purchase) => {
      const courseTitle = purchase.course.title;
      if (!grouped[courseTitle]) {
        grouped[courseTitle] = { total: 0, count: 0 };
      }
      grouped[courseTitle].total += purchase.course.price!;
      grouped[courseTitle].count += 1;
    });

    return grouped;
  }
}
