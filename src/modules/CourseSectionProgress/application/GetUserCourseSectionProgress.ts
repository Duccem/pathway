import { CourseSectionProgressRepository } from '../domain/CourseSectionProgressRepository';

export class GetUserCourseSectionProgress {
  constructor(private readonly repository: CourseSectionProgressRepository) {}

  async run(userId: string, sectionId: string) {
    return await this.repository.getUserSectionProgress(userId, sectionId);
  }
}
