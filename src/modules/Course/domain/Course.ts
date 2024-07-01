import { Aggregate } from '@/modules/shared/domain/core/Aggregate';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { Category } from './Category';
import { DeletedCourse } from './DeletedCourse';
import { Level } from './Level';
import { SubCategory } from './SubCategory';

export class Course extends Aggregate {
  constructor(
    id: string,
    public instructorId: string,
    public title: string,
    public subtitle: string,
    public description: string,
    public price: number,
    public imageUrl: string,
    public categoryId: string,
    public subCategoryId: string,
    public levelId: string,
    public isPublished: boolean,
    createdAt: Date,
    updatedAt: Date,
    public category?: Category,
    public subCategory?: SubCategory,
    public level?: Level
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromPrimitives(data: Primitives<Course>) {
    return new Course(
      data.id,
      data.instructorId,
      data.title,
      data.subtitle,
      data.description,
      data.price,
      data.imageUrl,
      data.categoryId,
      data.subCategoryId,
      data.levelId,
      data.isPublished,
      data.createdAt,
      data.updatedAt,
      data.category ? Category.fromPrimitives(data.category) : undefined,
      data.subCategory ? SubCategory.fromPrimitives(data.subCategory) : undefined,
      data.level ? Level.fromPrimitives(data.level) : undefined
    );
  }

  static Create(id: string, title: string, categoryId: string, subCategoryId: string, instructorId: string) {
    return new Course(
      id,
      instructorId,
      title,
      '',
      '',
      0,
      '',
      categoryId,
      subCategoryId,
      '',
      false,
      new Date(),
      new Date()
    );
  }

  toPrimitives() {
    return {
      id: this.id,
      instructorId: this.instructorId,
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl,
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId,
      levelId: this.levelId,
      isPublished: this.isPublished,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      category: this.category ? this.category.toPrimitives() : undefined,
      subCategory: this.subCategory ? this.subCategory.toPrimitives() : undefined,
      level: this.level ? this.level.toPrimitives() : undefined,
    };
  }

  publish() {
    this.isPublished = true;
  }

  unpublish() {
    this.isPublished = false;
  }

  updateCourse(data: Primitives<Course>) {
    const updatedData = {
      ...this.toPrimitives(),
      ...data,
    };

    return Course.fromPrimitives(updatedData);
  }

  deleteCourse() {
    this.record(new DeletedCourse({ userId: this.instructorId, courseId: this.id }));
  }
}
