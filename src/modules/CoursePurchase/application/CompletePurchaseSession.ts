import { CoursePurchase } from '../domain/CoursePurchase';
import { CoursePurchaseRepository } from '../domain/CoursePurchaseRepository';
import { CoursePurchaseService } from '../domain/CoursePurchaseService';

export class CompletePurchaseSession {
  constructor(
    private coursePurchaseRepository: CoursePurchaseRepository,
    private purchaseService: CoursePurchaseService
  ) {}

  async run(rawBody: string, signature: string) {
    const { customerId, courseId } = await this.purchaseService.getCompletedEventData(rawBody, signature);
    const purchase = CoursePurchase.Create(customerId, courseId);
    await this.coursePurchaseRepository.savePurchase(purchase);
  }
}
