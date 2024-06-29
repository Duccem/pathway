import { Aggregate } from '@/modules/shared/domain/core/Aggregate';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';

export class CourseSectionProgress extends Aggregate {
  constructor(
    id: string,
    public studentId: string,
    public sectionId: string,
    public isCompleted: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromPrimitives(data: any) {
    return new CourseSectionProgress(
      data.id,
      data.studentId,
      data.sectionId,
      data.isComplete,
      data.createdAt,
      data.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id,
      studentId: this.studentId,
      sectionId: this.sectionId,
      isComplete: this.isCompleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static Create(studentId: string, sectionId: string) {
    return new CourseSectionProgress(
      Uuid.random().value,
      studentId,
      sectionId,
      false,
      new Date(),
      new Date()
    );
  }

  toggle(isComplete: boolean) {
    this.isCompleted = isComplete;
  }
}
