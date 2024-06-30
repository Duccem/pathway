import { CourseSection } from '../domain/CourseSection';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class CreateSection {
  constructor(private repository: CourseSectionRepository) {}

  async run(id: string, title: string, courseId: string) {
    const lastPosition = await this.repository.getLastSectionPosition(courseId);
    const newPosition = lastPosition ? lastPosition + 1 : lastPosition;
    const section = CourseSection.Create(id, title, courseId, newPosition);
    await this.repository.saveSection(section);
  }
}
