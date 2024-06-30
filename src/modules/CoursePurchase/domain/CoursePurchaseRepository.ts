import { Course } from '@/modules/Course/domain/Course';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { CoursePurchase } from './CoursePurchase';
import { Customer } from './Customer';

export type PurchaseWithCourse = Primitives<CoursePurchase> & { course: Primitives<Course> };
export interface CoursePurchaseRepository {
  savePurchase(coursePurchase: CoursePurchase): Promise<void>;
  getCustomer(userId: string): Promise<Customer | null>;
  getPurchase(customerId: string, courseId: string): Promise<CoursePurchase | null>;
  listPurchased(customerId: string): Promise<CoursePurchase[]>;
  createCustomer(customer: Customer): Promise<void>;
  getPurchasedCourses(instructorId: string): Promise<PurchaseWithCourse[]>;
}
