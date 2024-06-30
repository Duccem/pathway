import { CoursePurchaseRepository } from '../domain/CoursePurchaseRepository';

export class GetPurchase {
  constructor(private coursePurchaseRepository: CoursePurchaseRepository) {}
  async run(userId: string, courseId: string) {
    return this.coursePurchaseRepository.getPurchase(userId, courseId);
  }
}
