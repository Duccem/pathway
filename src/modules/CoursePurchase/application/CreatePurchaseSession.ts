import { GetCourse } from '@/modules/Course/application/GetCourse';
import { CoursePurchase } from '../domain/CoursePurchase';
import { CoursePurchaseRepository } from '../domain/CoursePurchaseRepository';
import { CoursePurchaseService } from '../domain/CoursePurchaseService';

export class CreatePurchaseSession {
  constructor(
    private coursePurchaseRepository: CoursePurchaseRepository,
    private purchaseService: CoursePurchaseService,
    private courseSearcher: GetCourse
  ) {}

  async run(userId: string, userEmail: string, courseId: string) {
    let customer = await this.coursePurchaseRepository.getCustomer(userId);
    if (!customer) {
      const serviceCustomer = await this.purchaseService.getCustomer(userEmail);
      customer = CoursePurchase.createCustomer(userId, serviceCustomer.id);
    }
    const course = await this.courseSearcher.run(courseId, userId);
    const url = await this.purchaseService.createSession(course, customer);
    return {
      url,
    };
  }
}
