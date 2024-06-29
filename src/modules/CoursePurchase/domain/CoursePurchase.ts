import { Aggregate } from '@/modules/shared/domain/core/Aggregate';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { Customer } from './Customer';

export class CoursePurchase extends Aggregate {
  constructor(
    id: string,
    public courseId: string,
    public customerId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromPrimitives(data: Primitives<CoursePurchase>) {
    return new CoursePurchase(
      data.id,
      data.courseId,
      data.customerId,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }

  toPrimitives(): Primitives<CoursePurchase> {
    return {
      id: this.id,
      courseId: this.courseId,
      customerId: this.customerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static Create(customerId: string, courseId: string) {
    return new CoursePurchase(Uuid.random().value, courseId, customerId, new Date(), new Date());
  }

  static createCustomer(customerId: string, externalId: string) {
    return new Customer(Uuid.random().value, customerId, externalId, new Date(), new Date());
  }
}
