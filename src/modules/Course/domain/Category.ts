import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { SubCategory } from '@prisma/client';

export class Category {
  constructor(public id: string, public name: string, public subcategories?: SubCategory[]) {}
  static fromPrimitives(data: Primitives<Category>) {
    return new Category(data.id, data.name, data.subcategories ? data.subcategories : null);
  }
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      subcategories: this.subcategories ? this.subcategories : null,
    };
  }
}
