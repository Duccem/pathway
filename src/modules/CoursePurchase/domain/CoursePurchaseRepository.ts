import { CoursePurchase } from './CoursePurchase';
import { Customer } from './Customer';

export interface CoursePurchaseRepository {
  savePurchase(coursePurchase: CoursePurchase): Promise<void>;
  getCustomer(userId: string): Promise<Customer | null>;
  getPurchase(customerId: string, courseId: string): Promise<CoursePurchase | null>;
  listPurchased(customerId: string): Promise<CoursePurchase[]>;
  createCustomer(customer: Customer): Promise<void>;
}
