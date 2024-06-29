import { CourseSection } from '../domain/CourseSection';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class CreateSection {
  constructor(private repository: CourseSectionRepository) {}

  async run(title: string, courseId: string) {
    const lastPosition = await this.repository.getLastSectionPosition(courseId);
    const newPosition = lastPosition ? lastPosition + 1 : lastPosition;
    const section = CourseSection.Create(title, courseId, newPosition);
    await this.repository.saveSection(section);
  }
}
