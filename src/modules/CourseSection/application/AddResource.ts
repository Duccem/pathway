import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class AddResource {
  constructor(private repository: CourseSectionRepository) {}
  async run(courseId: string, sectionId: string, name: string, fileUrl: string) {
    const section = await this.repository.getSection(courseId, sectionId);
    section.addResource(name, fileUrl);
    await this.repository.addResource(section.resources.pop());
  }
}
