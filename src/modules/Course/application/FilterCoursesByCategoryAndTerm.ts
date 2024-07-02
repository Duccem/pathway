import { CourseRepository } from '../domain/CourseRepository';

export class FilterCoursesByCategoryAndTerm {
  constructor(private repository: CourseRepository) {}
  async run(category: string, term: string, userId: string) {
    const courses = await this.repository.filterCoursesByCategoryAndTerm(category, term, userId);
    return courses;
  }
}
