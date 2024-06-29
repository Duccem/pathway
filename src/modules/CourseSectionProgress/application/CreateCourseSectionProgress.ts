import { CourseSectionProgress } from '../domain/CourseSectionProgress';
import { CourseSectionProgressRepository } from '../domain/CourseSectionProgressRepository';

export class ToggleCourseSectionProgress {
  constructor(private readonly repository: CourseSectionProgressRepository) {}
  async run(studentId: string, sectionId: string, isCompleted: boolean) {
    let progress = await this.repository.getUserSectionProgress(studentId, sectionId);
    if (progress) {
      progress.toggle(isCompleted);
    }
    progress = CourseSectionProgress.Create(studentId, sectionId);
    await this.repository.saveProgress(progress);
  }
}
