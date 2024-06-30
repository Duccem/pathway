import { GetPurchases } from '@/modules/CoursePurchase/application/GetPurchases';
import { CourseRepository } from '../domain/CourseRepository';

export class GetPurchasedCourses {
  constructor(private repository: CourseRepository, private purchaseList: GetPurchases) {}
  async run(userId: string) {
    const purchases = await this.purchaseList.run(userId);
    const coursesIds = purchases.map((purchase) => purchase.courseId);
    return await this.repository.getPurchasedCourses(coursesIds);
  }
}
