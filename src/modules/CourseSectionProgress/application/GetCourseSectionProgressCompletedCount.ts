import { CourseSectionProgressRepository } from '../domain/CourseSectionProgressRepository';

export class GetCourseSectionProgressCompletedCount {
  constructor(private readonly repository: CourseSectionProgressRepository) {}
  async run(studentId: string, sectionIds: string[]) {
    return await this.repository.countCompletedSectionsProgress(studentId, sectionIds);
  }
}
