import { CourseRepository } from '../domain/CourseRepository';

export class SearchCourses {
  constructor(private repository: CourseRepository) {}

  async run(query: string) {
    const course = await this.repository.searchCourses(query);
  }
}
