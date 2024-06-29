import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class GetCourseAllSections {
  constructor(private repository: CourseSectionRepository) {}
  async run(courseId: string) {
    return await this.repository.getCoursesSections(courseId);
  }
}
