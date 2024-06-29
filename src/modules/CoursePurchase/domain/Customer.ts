import { Primitives } from '@/modules/shared/domain/types/Primitives';

export class Customer {
  constructor(
    public id: string,
    public customerId: string,
    public externalId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromPrimitives(data: Primitives<Customer>) {
    return new Customer(
      data.id,
      data.customerId,
      data.externalId,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }

  toPrimitives(): Primitives<Customer> {
    return {
      id: this.id,
      customerId: this.customerId,
      externalId: this.externalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
