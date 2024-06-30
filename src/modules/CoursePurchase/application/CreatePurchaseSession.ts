import { GetCourse } from '@/modules/Course/application/GetCourse';
import { FormatError } from '@/modules/shared/domain/core/errors/FormatError';
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
    const purchase = await this.coursePurchaseRepository.getPurchase(userId, courseId);
    if (purchase) {
      throw new FormatError('Purchase already exists');
    }
    let customer = await this.coursePurchaseRepository.getCustomer(userId);
    if (!customer) {
      const serviceCustomer = await this.purchaseService.getCustomer(userEmail);
      customer = CoursePurchase.createCustomer(userId, serviceCustomer.id);
      await this.coursePurchaseRepository.createCustomer(customer);
    }
    const course = await this.courseSearcher.run(courseId, userId);
    const url = await this.purchaseService.createSession(course, customer);
    return {
      url,
    };
  }
}
