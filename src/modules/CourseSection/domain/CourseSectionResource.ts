import { Primitives } from '@/modules/shared/domain/types/Primitives';

export class CourseSectionResource {
  constructor(
    public id: string,
    public name: string,
    public fileUrl: string,
    public sectionId: string,
    public courseId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromPrimitives(data: Primitives<CourseSectionResource>) {
    return new CourseSectionResource(
      data.id,
      data.name,
      data.fileUrl,
      data.sectionId,
      data.courseId,
      data.createdAt,
      data.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      fileUrl: this.fileUrl,
      sectionId: this.sectionId,
      courseId: this.courseId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
