import { Primitives } from '@/modules/shared/domain/types/Primitives';

export class Level {
  constructor(public id: string, public name: string) {}
  static fromPrimitives(data: Primitives<Level>) {
    return new Level(data.id, data.name);
  }
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
