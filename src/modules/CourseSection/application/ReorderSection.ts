import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { CourseSection } from '../domain/CourseSection';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';

export class ReorderSection {
  constructor(private repository: CourseSectionRepository) {}
  async run(list: Primitives<CourseSection>[]) {
    const sections = list.map((data) => CourseSection.fromPrimitives(data));
    const updatePromises = [];
    for (const section of sections) {
      updatePromises.push(this.repository.reorderSections(section));
    }
    await Promise.all(updatePromises);
  }
}
