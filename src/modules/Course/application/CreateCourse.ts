import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class CreateCourse {
  constructor(private repository: CourseRepository) {}

  async run(id: string, title: string, categoryId: string, subCategoryId: string, userId: string) {
    const newCourse = Course.Create(id,title, categoryId, subCategoryId, userId);
    await this.repository.saveCourse(newCourse);
  }
}
