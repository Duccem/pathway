import { CourseRepository } from '../domain/CourseRepository';

export class SearchCourses {
  constructor(private repository: CourseRepository) {}

  async run(query: string, userId: string) {
    const courses = await this.repository.searchCourses(query, userId);
    return courses;
  }
}
