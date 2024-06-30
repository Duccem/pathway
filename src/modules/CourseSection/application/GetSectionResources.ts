import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class GetSectionResources {
  constructor(private courseSectionRepository: CourseSectionRepository) {}
  async run(sectionId: string) {
    return await this.courseSectionRepository.getResources(sectionId);
  }
}
