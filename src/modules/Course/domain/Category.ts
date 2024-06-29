import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { SubCategory } from '@prisma/client';

export class Category {
  constructor(public id: string, public name: string, private subCategories?: SubCategory[]) {}
  static fromPrimitives(data: Primitives<Category>) {
    return new Category(data.id, data.name);
  }
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      subCategories: this.subCategories ? this.subCategories : null,
    };
  }
}
