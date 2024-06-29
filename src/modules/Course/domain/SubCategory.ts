import { Primitives } from '@/modules/shared/domain/types/Primitives';

export class SubCategory {
  constructor(
    public id: string,
    public name: string,
    public categoryId: string
  ) {}
  static fromPrimitives(data: Primitives<SubCategory>) {
    return new SubCategory(data.id, data.name, data.categoryId);
  }
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
    };
  }
}
