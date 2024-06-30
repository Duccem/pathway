import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class GetSection {
  constructor(private repository: CourseSectionRepository) {}
  async run(courseId: string, sectionId: string) {
    return await this.repository.getSection(courseId, sectionId);
  }
}
