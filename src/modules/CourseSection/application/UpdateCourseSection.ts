import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { CourseSection } from '../domain/CourseSection';
import { CourseSectionRepository } from '../domain/CourseSectionRepository';
import { VideoStoreService } from '../domain/VideoStoreService';

export class UpdateCourseSection {
  constructor(private repository: CourseSectionRepository, private videoStoreService: VideoStoreService) {}

  async run(courseId: string, sectionId: string, data: Primitives<CourseSection>) {
    const section = await this.repository.getSection(courseId, sectionId);
    const updatedSection = section.updateData(data);
    await this.repository.saveSection(updatedSection);
  }
}
