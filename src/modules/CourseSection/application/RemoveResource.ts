import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class RemoveResource {
  constructor(private repository: CourseSectionRepository) {}

  async run(resourceId: string, sectionId: string) {
    await this.repository.removeResource(resourceId, sectionId);
  }
}
