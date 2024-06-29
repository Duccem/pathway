import { Course } from '@/modules/Course/domain/Course';
import { Customer } from './Customer';

export interface CoursePurchaseService {
  getCustomer(email: string): Promise<any>;
  createSession(course: Course, customer: Customer): Promise<string>;
  getCompletedEventData(
    rawBody: string,
    signature: string
  ): Promise<{ customerId: string; courseId: string }>;
}
