import { PrismaClient } from '@prisma/client';
import { CoursePurchase } from '../domain/CoursePurchase';
import { CoursePurchaseRepository, PurchaseWithCourse } from '../domain/CoursePurchaseRepository';
import { Customer } from '../domain/Customer';

export class PrismaCoursePurchaseRepository implements CoursePurchaseRepository {
  constructor(private client: PrismaClient) {}
  get model() {
    return this.client.coursePurchase;
  }
  async savePurchase(coursePurchase: CoursePurchase): Promise<void> {
    await this.model.create({
      data: {
        id: coursePurchase.id,
        courseId: coursePurchase.courseId,
        customerId: coursePurchase.customerId,
      },
    });
  }
  async getCustomer(userId: string): Promise<Customer> {
    const customer = await this.client.stripeCustomer.findUnique({
      where: {
        customerId: userId,
      },
    });
    return customer ? Customer.fromPrimitives(customer) : null;
  }
  async getPurchase(customerId: string, courseId: string): Promise<CoursePurchase> {
    const purchase = await this.model.findUnique({
      where: {
        customerId_courseId: {
          customerId,
          courseId,
        },
      },
    });
    return purchase ? CoursePurchase.fromPrimitives(purchase) : null;
  }
  async listPurchased(customerId: string): Promise<CoursePurchase[]> {
    const purchases = await this.model.findMany({
      where: {
        customerId,
      },
    });
    return purchases.map((purchase) => CoursePurchase.fromPrimitives(purchase));
  }
  async createCustomer(customer: Customer): Promise<void> {
    await this.client.stripeCustomer.create({
      data: {
        id: customer.id,
        externalId: customer.externalId,
        customerId: customer.customerId,
      },
    });
  }
  async getPurchasedCourses(instructorId: string): Promise<PurchaseWithCourse[]> {
    const purchases = await this.model.findMany({
      where: {
        course: {
          instructorId,
        },
      },
      include: {
        course: true,
      },
    });
    return purchases;
  }
}
