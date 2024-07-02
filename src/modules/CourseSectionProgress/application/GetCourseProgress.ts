import { GetCourseAllSections } from '@/modules/CourseSection/application/GetCourseAllSections';
import { CourseSectionProgress } from '../domain/CourseSectionProgress';
import { CourseSectionProgressRepository } from '../domain/CourseSectionProgressRepository';

export class GetCourseProgress {
  constructor(
    private readonly courseSectionProgressRepository: CourseSectionProgressRepository,
    private readonly sectionGetter: GetCourseAllSections
  ) {}

  async run(courseId: string, userId: string) {
    const sections = await this.sectionGetter.run(courseId);
    const sectionsProgress: CourseSectionProgress[] = [];
    for (const section of sections) {
      const progress = await this.courseSectionProgressRepository.getUserSectionProgress(userId, section.id);
      sectionsProgress.push(progress);
    }
    const percentage =
      sectionsProgress.filter((progress) => progress.isCompleted).reduce((acc, progress) => acc + 1, 0) /
      (sectionsProgress.length ? sectionsProgress.length : 1);
    return percentage * 100;
  }
}
