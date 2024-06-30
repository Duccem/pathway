import { CourseRepository } from '../domain/CourseRepository';

export class GetCategories {
  constructor(private repository: CourseRepository) {}
  async run() {
    return await this.repository.getCourseCategories();
  }
}
