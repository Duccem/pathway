import { CoursePurchaseRepository } from '../domain/CoursePurchaseRepository';

export class GetPurchases {
  constructor(private repository: CoursePurchaseRepository) {}
  async run(userId: string) {
    return await this.repository.listPurchased(userId);
  }
}
