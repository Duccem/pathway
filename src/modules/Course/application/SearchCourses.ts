import { CourseRepository } from '../domain/CourseRepository';

export class SearchCourses {
  constructor(private repository: CourseRepository) {}

  async run(query: string) {
    const courses = await this.repository.searchCourses(query);
    return courses;
  }
}
