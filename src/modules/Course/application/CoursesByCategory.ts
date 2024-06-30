import { CourseRepository } from '../domain/CourseRepository';

export class CoursesByCategory {
  constructor(private repository: CourseRepository) {}

  async run(category: string) {
    return await this.repository.getCoursesByCategory(category);
  }
}
